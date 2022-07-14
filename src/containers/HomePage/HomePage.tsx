import { Button, Heading, Stack, useDisclosure } from '@chakra-ui/react';

import { ICreateTankFormValues } from '../../components/forms';
import { ITank, useTanks } from '../../hooks/useTanks';
import { CreateTankDrawer } from './components/CreateTankDrawer';

export const HomePage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { postTank } = useTanks();

  const handleCreateTank = async (v: ICreateTankFormValues) => {
    const newTank: ITank = {
      id: v.id,
      owner_id: 9, // TODO: get from user
      owner_name: 'Enrique Perez', // TODO: get from user
      refrigerant: v.refrigerant,
      tankWeight: v.tankWeight,
    };
    try {
      await postTank(newTank);
      onClose();
      // navigate('/');
    } catch (error) {
      console.log('hubo un error', error);
    }
  };

  return (
    <Stack p={4}>
      <Heading>HomePage</Heading>

      <Button
        alignSelf="end"
        colorScheme="green"
        onClick={onOpen}
        px={12}
        size="sm"
      >
        Create
      </Button>

      <CreateTankDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateTank}
      />
    </Stack>
  );
};
