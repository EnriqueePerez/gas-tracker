import { Heading, useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';

import { BackButton, Layout } from '../../components/elements';
import {
  CreateGasDischargeForm,
  ICreateGasDischargeFormValues,
} from '../../components/forms';
import { getCurrentDate } from '../../helpers';
import { IGasDischarge, useGasDischarges } from '../../hooks/useGasDischarges';

export const CreateGasDischargePage = (): JSX.Element => {
  const { postGasDischarge } = useGasDischarges();
  const { data: user } = useUser();

  const location = useLocation();

  const navigate = useNavigate();

  const toast = useToast();

  const handleOnSubmit = async (v: ICreateGasDischargeFormValues) => {
    const tank_id = (location.state as { tank_id: string })?.tank_id;
    const payload: IGasDischarge = {
      ...v,
      owner_name: user?.displayName as string,
      tank_id,
      timedate_of_start: getCurrentDate(v.timedate_of_start),
    };
    try {
      await postGasDischarge(payload, tank_id);
      const description = 'El registro fue creado exitosamente.';
      toast({ description, status: 'success' });
      navigate('/', { state: {} });
    } catch (error) {
      console.error(error);
      const description = 'Ocurrio un error al procesar tu solicitud.';
      toast({ description, status: 'error' });
    }
  };

  return (
    <Layout>
      <Heading mb="10">Nueva descarga de gas</Heading>

      <CreateGasDischargeForm
        onSubmit={handleOnSubmit}
        width={{ base: '100%', lg: '800px' }}
      />

      <BackButton onClick={() => navigate('/')} />
    </Layout>
  );
};
