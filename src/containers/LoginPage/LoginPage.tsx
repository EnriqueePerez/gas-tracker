import { Box, Heading } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import { ILoginFormValues, LoginForm } from '../../components/forms';
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin';

export const LoginPage = (): JSX.Element => {
  const { login } = useFirebaseLogin();

  const { data } = useSigninCheck();

  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async (v: ILoginFormValues) => {
      try {
        await login(v);
        navigate('/');
      } catch (error) {
        console.log('hubo un error', error);
      }
    },
    [login, navigate],
  );

  if (data?.signedIn) return <Navigate to="/" />;

  return (
    <Box alignItems="center" display="flex" flexDir="column" px={4} py={20}>
      <Heading fontSize="1.75rem" mb={6}>
        Inicia Sesión
      </Heading>

      <LoginForm
        onSubmit={handleOnSubmit}
        width={{ base: '100%', md: '480px' }}
      />
    </Box>
  );
};
