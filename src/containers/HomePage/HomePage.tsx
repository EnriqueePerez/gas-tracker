import {
  Button,
  Heading,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from 'reactfire';

import {
  AcceptInviteModal,
  InvitesMenu,
  Layout,
  UserOptionsMenu,
} from '../../components/elements';
import { SparesSectionButton } from '../../components/elements/SparesSection/SparesSectionButton';
import {
  ICreateTankFormValues,
  ILoginFormValues,
} from '../../components/forms';
import { IAcceptInviteFormValues } from '../../components/forms/AcceptInviteForm/helpers/form-helpers';
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin';
import { ISendedTank, useSendedTanks } from '../../hooks/useSendedTanks';
import { ITank, useTanks } from '../../hooks/useTanks';
import { CreateTankDrawer } from './components/CreateTankDrawer';
import { TankListing } from './components/TankListing';

export const HomePage = (): JSX.Element => {
  const [transferInvites, setTransferInvites] = useState<ISendedTank[]>([]);
  const [acceptedTank, setAcceptedTank] = useState<Partial<ISendedTank>>({});
  const [acceptedTankId, setAcceptedTankId] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const { getTanks, postTank, tanks } = useTanks();
  const { getTransferInvite, patchSendedTank } = useSendedTanks();
  const { data: user } = useUser();
  const { login, logout } = useFirebaseLogin();
  const toast = useToast();

  const handleCreateTank = async (v: ICreateTankFormValues) => {
    const newTank: ITank = {
      id: v.id,
      owner_id: Number(user?.uid),
      owner_name: user?.displayName as string,
      refrigerant: v.refrigerant,
      tank_weight: v.tank_weight,
    };
    try {
      if (tanks?.find((t) => t.id === newTank.id)) {
        const description = 'Ya existe una boya con este ID.';
        toast({ description, status: 'error' });
      } else {
        await postTank(newTank);
        const description = 'Boya creada exitosamente.';
        toast({ description, status: 'success' });
        await getTanks();
        onClose();
      }
    } catch (error) {
      console.log('hubo un error', error);
      const description = 'Hubo un error al registrar la boya.';
      toast({ description, status: 'error' });
    }
  };

  const fetchTransferInvites = useCallback(async () => {
    const invites = await getTransferInvite(user?.uid as string);
    setTransferInvites(invites);
  }, []);

  const handleAcceptInvite = useCallback(
    async (v: IAcceptInviteFormValues) => {
      const payload: ILoginFormValues = {
        ...v,
        email: user?.email as string,
      };
      try {
        await login(payload);
        await patchSendedTank(acceptedTank, acceptedTankId);
        await fetchTransferInvites();
        const description = 'Boya aceptada exitosamente.';
        toast({ description, status: 'success' });
        onModalClose();
      } catch (error) {
        console.error(error);
        const description = 'La contraseña es incorrecta';
        toast({ description, status: 'error' });
      }
    },
    [login],
  );

  const handleLogout = useCallback(async () => {
    await logout();
    const description = 'Sesión cerrada exitosamente.';
    toast({ description, status: 'success' });
  }, [logout]);

  useEffect(() => {
    fetchTransferInvites();
    getTanks();
  }, []);

  // TODO: add loaders.
  return (
    <Layout alignItems="start">
      <Stack isInline justify="space-between" w="100%">
        <Heading>Gas Tracker</Heading>

        <Stack isInline spacing={4}>
          <Button
            alignSelf="end"
            colorScheme="green"
            onClick={onOpen}
            px={5}
            size="sm"
          >
            Registrar Boya
          </Button>
        </Stack>
      </Stack>

      <TankListing mt={8} tanks={tanks} w="100%" />

      <CreateTankDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateTank}
      />

      <SparesSectionButton />

      <UserOptionsMenu
        handleLogout={handleLogout}
        position="absolute"
        right={28}
        top={4}
      />

      <InvitesMenu
        invites={transferInvites}
        onAccept={async (tank: Partial<ISendedTank>, id: string) => {
          setAcceptedTank(tank);
          setAcceptedTankId(id);
          onModalOpen();
        }}
        onReject={async (tank: Partial<ISendedTank>, id: string) => {
          await patchSendedTank(tank, id);
          await fetchTransferInvites();
        }}
        position="absolute"
        right={16}
        top={4}
        user={user}
      />

      <AcceptInviteModal
        handleAcceptInvite={handleAcceptInvite}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </Layout>
  );
};
