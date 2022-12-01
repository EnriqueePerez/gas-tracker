import {
  Button,
  Heading,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';

import { BackButton, Layout } from '../../components/elements';
import { IRegisterSpareFormValues } from '../../components/forms';
import { ISpare, useSpares } from '../../hooks/useSpares';
import { RegisterSpareDrawer } from './components/RegisterSpareDrawer';
import { SparesListing } from './components/SparesListing';

export const SparesInfoPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getSpares, postSpare, spares } = useSpares();
  const { data: user } = useUser();
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegisterSpare = async (v: IRegisterSpareFormValues) => {
    const newSpare: ISpare = {
      folio: v.folio,
      name: v.name,
      registrant_name: user?.displayName as string,
      store: v.store,
      unit: v.unit,
    };
    try {
      await postSpare(newSpare);
      const description = 'Refacción registrada exitosamente.';
      toast({ description, status: 'success' });
      await getSpares();
      onClose();
    } catch (error) {
      console.log('hubo un error', error);
      const description = 'Hubo un error al registrar la refacción.';
      toast({ description, status: 'error' });
    }
  };

  useEffect(() => {
    getSpares();
  }, []);

  return (
    <Layout alignItems="start">
      <BackButton onClick={() => navigate('/', { state: {} })} />
      <Stack isInline justify="space-between" w="100%">
        <Heading>Refacciones</Heading>

        <Stack isInline spacing={4}>
          <Button
            alignSelf="end"
            colorScheme="green"
            onClick={onOpen}
            px={5}
            size="sm"
          >
            Registrar Refacción
          </Button>
        </Stack>
      </Stack>

      <SparesListing mt={8} spares={spares} w="100%" />

      <RegisterSpareDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleRegisterSpare}
      />
    </Layout>
  );
};
