import { Box, Heading, Image, Text, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import { ILoginFormValues, LoginForm } from '../../components/forms';
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin';

export const LoginPage = (): JSX.Element => {
  const { login } = useFirebaseLogin();

  const { data } = useSigninCheck();

  const navigate = useNavigate();
  const toast = useToast();

  const handleOnSubmit = useCallback(
    async (v: ILoginFormValues) => {
      try {
        await login(v);
        navigate('/');
      } catch (error) {
        console.error('hubo un error', error);
        const description =
          'Hubo un error al iniciar sesión. Por favor, verifica tus credenciaes.';
        toast({ description, status: 'error' });
      }
    },
    [login, navigate],
  );

  if (data?.signedIn) return <Navigate to="/" />;

  return (
    <Box alignItems="center" display="flex" flexDir="column" px={4} py={20}>
      <Image mb={6} src="logo192.png" width="8em" />
      <Heading fontSize="1.75rem" mb={6} textAlign="center">
        Trackeador de Boyas <br />
        <Text fontSize="1rem" fontStyle="italic" fontWeight="normal">
          by Termoconfort
        </Text>
      </Heading>

      <LoginForm
        onSubmit={handleOnSubmit}
        width={{ base: '100%', md: '480px' }}
      />
    </Box>
  );
};
