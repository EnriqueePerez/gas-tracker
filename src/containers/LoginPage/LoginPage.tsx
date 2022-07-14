import { Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { ILoginFormValues, LoginForm } from '../../components/forms';
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin';

export const LoginPage = (): JSX.Element => {
  const { login } = useFirebaseLogin();

  const navigate = useNavigate();

  const handleOnSubmit = async (v: ILoginFormValues) => {
    try {
      await login(v);
      navigate('/');
    } catch (error) {
      console.log('hubo un error', error);
    }
  };

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
