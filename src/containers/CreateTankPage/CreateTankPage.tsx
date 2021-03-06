import { Box, Heading } from '@chakra-ui/react';

import { CreateTankForm, ICreateTankFormValues } from '../../components/forms';
import { ITank, useTanks } from '../../hooks/useTanks';

export const CreateTankPage = (): JSX.Element => {
  const { postTank } = useTanks();

  const handleOnSubmit = async (v: ICreateTankFormValues) => {
    const newTank: ITank = {
      id: v.id,
      owner_id: 9, // TODO: get from user
      owner_name: 'Enrique Perez', // TODO: get from user
      refrigerant: v.refrigerant,
      tank_weight: v.tank_weight,
    };
    try {
      await postTank(newTank);
      // navigate('/');
    } catch (error) {
      console.log('hubo un error', error);
    }
  };

  return (
    <Box alignItems="center" display="flex" flexDir="column" p={4}>
      <Heading mb="10">Nueva boya</Heading>

      <CreateTankForm
        onSubmit={handleOnSubmit}
        width={{ base: '100%', lg: '800px' }}
      />
    </Box>
  );
};
