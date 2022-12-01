import { Heading, useToast } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackButton, Layout } from '../../components/elements';
import { IUpdateSpareFormValues } from '../../components/forms';
import { UpdateSpareForm } from '../../components/forms/UpdateSpareForm/UpdateSpareForm';
import { ISpare, useSpares } from '../../hooks/useSpares';

export const UpdateSparePage = (): JSX.Element => {
  const { patchSpare } = useSpares();

  const location = useLocation();

  const navigate = useNavigate();

  const toast = useToast();

  const handleOnSubmit = async (v: IUpdateSpareFormValues) => {
    const spare_id = (location.state as { spare: ISpare }).spare.id;
    try {
      const payload: Partial<ISpare> = {
        authorization_date: v.authorization_date,
        installation_date: v.installation_date,
        reception_date: v.reception_date,
        request_date: v.request_date,
      };
      console.log('spare_id', spare_id);
      console.log('payload', payload);

      await patchSpare(payload, spare_id as string);
      const description = 'El registro fue actualizado exitosamente.';
      toast({ description, status: 'success' });
      navigate('/spares', { state: {} });
    } catch (error) {
      console.error(error);
      const description = 'Ocurrio un error al procesar tu solicitud.';
      toast({ description, status: 'error' });
    }
  };

  const initialValues = useMemo(
    () => ({
      authorization_date:
        (
          location.state as { spare: ISpare }
        ).spare.authorization_date?.substring(0, 10) || '',
      installation_date:
        (
          location.state as { spare: ISpare }
        ).spare.installation_date?.substring(0, 10) || '',
      reception_date:
        (location.state as { spare: ISpare }).spare.reception_date?.substring(
          0,
          10,
        ) || '',
      request_date:
        (location.state as { spare: ISpare }).spare.request_date?.substring(
          0,
          10,
        ) || '',
      supplier: (location.state as { spare: ISpare }).spare.supplier,
    }),
    [location.state],
  );

  return (
    <Layout>
      <Heading mb="10">Actualizar refacción</Heading>
      <Heading size="sm">
        Refacción: {(location.state as { spare: ISpare }).spare.name}
      </Heading>

      <UpdateSpareForm
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        width={{ base: '100%', lg: '800px' }}
      />

      <BackButton onClick={() => navigate('/spares')} />
    </Layout>
  );
};
