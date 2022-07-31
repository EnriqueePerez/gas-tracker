import { Box, Heading } from '@chakra-ui/react';
import { useUser } from 'reactfire';

import {
  CreateGasDischargeForm,
  ICreateGasDischargeFormValues,
} from '../../components/forms';
import { IGasDischarge, useGasDischarges } from '../../hooks/useGasDischarges';

export const CreateGasDischargePage = (): JSX.Element => {
  const { postGasDischarge } = useGasDischarges();
  const { data: user } = useUser();

  const handleOnSubmit = async (v: ICreateGasDischargeFormValues) => {
    const newGasDischarge: IGasDischarge = {
      actual_tank_weight: v.actual_tank_weight,
      comments: v.comments,
      folio: v.folio,
      owner_name: user?.displayName as string,
      store: v.store,
      tank_id: v.tank_id,
      timedate_of_start: v.timedate_of_start,
    };
    try {
      await postGasDischarge(newGasDischarge, v.tank_id);
    } catch (error) {
      console.log('hubo un error', error);
    }
  };

  return (
    <Box alignItems="center" display="flex" flexDir="column" p={4}>
      <Heading mb="10">Nueva descarga de gas</Heading>

      <CreateGasDischargeForm
        onSubmit={handleOnSubmit}
        width={{ base: '100%', lg: '800px' }}
      />
    </Box>
  );
};
