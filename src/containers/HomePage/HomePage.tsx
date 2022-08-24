import { Button, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from 'reactfire';

import { Layout } from '../../components/elements';
import { InvitesMenu } from '../../components/elements/InvitesMenu/InvitesMenu';
import { ICreateTankFormValues } from '../../components/forms';
import { ISendedTank, useSendedTanks } from '../../hooks/useSendedTanks';
import { ITank, useTanks } from '../../hooks/useTanks';
import { CreateTankDrawer } from './components/CreateTankDrawer';
import { TankListing } from './components/TankListing';

export const HomePage = (): JSX.Element => {
  const [transferInvites, setTransferInvites] = useState<ISendedTank[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getTanks, postTank, tanks } = useTanks();
  const { getTransferInvite, patchSendedTank } = useSendedTanks();
  const { data: user } = useUser();

  const handleCreateTank = async (v: ICreateTankFormValues) => {
    const newTank: ITank = {
      id: v.id,
      owner_id: Number(user?.uid),
      owner_name: user?.displayName as string,
      refrigerant: v.refrigerant,
      tank_weight: v.tank_weight,
    };
    try {
      await postTank(newTank);
      onClose();
      // navigate('/');
    } catch (error) {
      console.log('hubo un error', error);
    }
  };

  const fetchTransferInvites = useCallback(async () => {
    const invites = await getTransferInvite(user?.uid as string);
    setTransferInvites(invites);
  }, []);

  useEffect(() => {
    fetchTransferInvites();
    getTanks();
  }, []);

  // TODO: add loaders.
  return (
    <Layout alignItems="start">
      <Stack isInline justify="space-between" w="100%">
        <Heading>Gas Tracker</Heading>

        <Button
          alignSelf="end"
          colorScheme="green"
          onClick={onOpen}
          px={12}
          size="sm"
        >
          Create
        </Button>
      </Stack>

      <TankListing mt={8} tanks={tanks} w="100%" />

      <CreateTankDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateTank}
      />

      <InvitesMenu
        invites={transferInvites}
        onAccept={async (tank: Partial<ISendedTank>, id: string) => {
          await patchSendedTank(tank, id);
          await fetchTransferInvites();
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
    </Layout>
  );
};
