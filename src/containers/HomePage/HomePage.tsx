import { Button, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';

import { ICreateTankFormValues } from '../../components/forms';
import { ITank, useTanks } from '../../hooks/useTanks';
import { CreateTankDrawer } from './components/CreateTankDrawer';
import { TankListing } from './components/TankListing';

export const HomePage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getTanks, postTank, tanks } = useTanks();

  const handleCreateTank = async (v: ICreateTankFormValues) => {
    const newTank: ITank = {
      id: v.id,
      owner_id: 9, // TODO: get from user
      owner_name: 'Enrique Perez', // TODO: get from user
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
    console.log('aqui estan los tanks', tanks);
  }, []);

  return (
    <Stack p={4}>
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

      <TankListing mt={8} tanks={tanks} />

      <CreateTankDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateTank}
      />
    </Stack>
  );
};
