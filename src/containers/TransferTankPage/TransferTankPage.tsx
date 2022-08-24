import { Heading } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';

import { BackButton, Layout } from '../../components/elements';
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

  const location = useLocation();

  const navigate = useNavigate();

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
      navigate('/', { state: {} });
    } catch (error) {
      console.log('hubo un error', error);
    }
  };

  const initialValues = useMemo(
    () => ({
      new_owner_name: '',
      tank_id: (location.state as { tank_id: string })?.tank_id,
    }),
    [location.state],
  );

  useEffect(() => {
    getTanksIds();
    getUsers();
  }, []);

  return (
    <Layout>
      <Heading mb="10">Transferencia de boya</Heading>

      <TransferTankForm
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        tanks={tanksIds}
        users={users}
        width={{ base: '100%', md: '480px' }}
      />

      <BackButton onClick={() => navigate('/', { state: {} })} />
    </Layout>
  );
};
