import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUser } from 'reactfire';

import {
  ITransferTankFormValues,
  TransferTankForm,
} from '../../components/forms';
import { ISendedTank, useSendedTanks } from '../../hooks/useSendedTanks';
import { useTanks } from '../../hooks/useTanks';
import { useUsers } from '../../hooks/useUsers';

export const TransferTankPage = (): JSX.Element => {
  const { postSendedTank } = useSendedTanks();
  const { getTanks } = useTanks();
  const { data: user } = useUser();
  const { getUsers, users } = useUsers();
  const [tanksIds, setTanksIds] = useState<string[]>([]);

  const getTanksIds = () => {
    getTanks().then((tanks) => {
      // filter tanks by userid
      const filteredTanks = tanks.filter(
        (tank) => tank.owner_id === Number(user?.uid),
      );
      const ids = filteredTanks.map((tank) => tank.id);
      setTanksIds(ids as string[]);
    });
  };

  const handleOnSubmit = async (v: ITransferTankFormValues) => {
    const newTransferTank: ISendedTank = {
      new_owner_id: Number(
        users.find((usr) => usr.name === v.new_owner_name)?.id,
      ),
      new_owner_name: v.new_owner_name,
      tank_id: v.tank_id,
    };
    try {
      postSendedTank(newTransferTank);
    } catch (error) {
      console.log('hubo un error', error);
    }
  };

  useEffect(() => {
    getTanksIds();
    getUsers();
  }, []);

  return (
    <Box alignItems="center" display="flex" flexDir="column" px={4} py={20}>
      <Heading mb="10">Transferencia de boya</Heading>

      <TransferTankForm
        onSubmit={handleOnSubmit}
        tanks={tanksIds}
        users={users}
        width={{ base: '100%', md: '480px' }}
      />
    </Box>
  );
};
