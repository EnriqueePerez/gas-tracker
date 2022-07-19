import { Box, Heading } from '@chakra-ui/react';

import {
  ITransferTankFormValues,
  TransferTankForm,
} from '../../components/forms';
import { ISendedTank, useSendedTanks } from '../../hooks/useSendedTanks';

export const TransferTankPage = (): JSX.Element => {
  const { postSendedTank } = useSendedTanks();

  const handleOnSubmit = async (v: ITransferTankFormValues) => {
    const newTransferTank: ISendedTank = {
      new_owner_id: 9,
      // TODO: get from user
      new_owner_name: 'Enrique Perez',
      // TODO: get from user
      tank_id: v.tank_id,
    };
    try {
      postSendedTank(newTransferTank);
      //   await login(v);
    } catch (error) {
      console.log('hubo un error', error);
    }
  };

  return (
    <Box alignItems="center" display="flex" flexDir="column" px={4} py={20}>
      <Heading mb="10">Transferencia de boya</Heading>

      <TransferTankForm
        onSubmit={handleOnSubmit}
        width={{ base: '100%', md: '480px' }}
      />
    </Box>
  );
};
