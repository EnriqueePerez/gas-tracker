import { Box, Heading, Image, useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackButton, Layout } from '../../components/elements';
import { IUpdateSpareFormValues } from '../../components/forms';
import { UpdateSpareForm } from '../../components/forms/UpdateSpareForm/UpdateSpareForm';
import { ISpare, useSpares } from '../../hooks/useSpares';

export const UpdateSparePage = (): JSX.Element => {
  const { patchSpare, postServiceSheet, getServiceSheet } = useSpares();
  const [serviceSheet, setServiceSheet] = useState<Blob>();

  const location = useLocation();

  const navigate = useNavigate();

  const toast = useToast();

  const handleOnSubmit = async ({
    service_sheet,
    ...v
  }: IUpdateSpareFormValues) => {
    const spare_id = (location.state as { spare: ISpare }).spare.id;

    if (service_sheet) {
      await postServiceSheet(
        service_sheet as unknown as File,
        spare_id as string,
        (service_sheet as unknown as File).type,
      );
    }

    try {
      const payload: Partial<ISpare> = {
        authorization_date: v.authorization_date,
        installation_date: v.installation_date,
        reception_date: v.reception_date,
        request_date: v.request_date,
        service_sheet: service_sheet ? 'Si' : undefined,
      };

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

  const fetchServiceSheet = async () => {
    const spare_id = (location.state as { spare: ISpare }).spare.id;
    const file = await getServiceSheet(spare_id as string);
    setServiceSheet(file as Blob);
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
      service_sheet: serviceSheet,
      supplier: (location.state as { spare: ISpare }).spare.supplier,
    }),
    [location.state, serviceSheet],
  );

  useEffect(() => {
    if ((location.state as { spare: ISpare }).spare.service_sheet)
      fetchServiceSheet();
  }, []);

  return (
    <Layout>
      <Heading mb="5">Actualizar refacción</Heading>
      <Heading mb="5" size="sm" textAlign="center">
        Tienda: {(location.state as { spare: ISpare }).spare.store}
      </Heading>
      <Heading mb="10" size="sm" textAlign="center">
        Refacción: {(location.state as { spare: ISpare }).spare.name}
      </Heading>
      <UpdateSpareForm
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        width={{ base: '100%', lg: '800px' }}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        marginTop="20px"
      >
        {serviceSheet ? (
          <>
            <Heading mb="4" size="lg" textAlign="center">
              Hoja de servicio
            </Heading>
            <Image
              src={URL.createObjectURL(serviceSheet)}
              width={{ base: '100%', lg: '800px' }}
            />
          </>
        ) : null}
      </Box>

      <BackButton onClick={() => navigate('/spares')} />
    </Layout>
  );
};
