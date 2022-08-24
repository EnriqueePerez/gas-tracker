import { Button, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useUser } from 'reactfire';

import { Layout } from '../../components/elements';
import { ICreateTankFormValues } from '../../components/forms';
import { ITank, useTanks } from '../../hooks/useTanks';
import { CreateTankDrawer } from './components/CreateTankDrawer';
import { TankListing } from './components/TankListing';

export const HomePage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getTanks, postTank, tanks } = useTanks();
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

  useEffect(() => {
    getTanks();
  }, []);

  // TODO: add loaders.
  // if(isFetchingTransferInvites) return null;

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
    </Layout>
  );
};
