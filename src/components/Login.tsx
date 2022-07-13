import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useFirebaseLogin } from '../hooks/useFirebaseLogin';

interface ILogin {
  email: string | null;
  password: string | null;
}

export const Login = () => {
  const [formData, setFormData] = useState<ILogin>({
    email: null,
    password: null,
  });
  const { signIn } = useFirebaseLogin();
  const { isOpen: isLoginFailed, onOpen, onClose } = useDisclosure();

  const handleInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('formData', formData);
    try {
      await signIn(formData);
    } catch (error) {
      onOpen();
      console.log('hubo un error', error);
    }
  };

  const isEmailEmpty = formData.email === '';
  const isPasswordEmpty = formData.password === '';

  return (
    <Box justifySelf="center">
      <Heading marginBottom="10" textAlign="center">
        Bienvenido
      </Heading>
      <FormControl
        isInvalid={isEmailEmpty}
        marginY="4"
        maxWidth="300px"
        width="80%"
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input name="email" onChange={handleInput} type="email" />
        {isEmailEmpty ? (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        ) : null}
      </FormControl>
      <FormControl
        isInvalid={isPasswordEmpty}
        marginY="4"
        maxWidth="300px"
        width="80%"
      >
        <FormLabel htmlFor="password">Contraseña</FormLabel>
        <Input name="password" onChange={handleInput} type="password" />
        {isEmailEmpty ? (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        ) : null}
      </FormControl>
      <Button
        colorScheme="blue"
        justifySelf="center"
        maxWidth="300px"
        onClick={handleSubmit}
        width="80%"
      >
        Iniciar Sesión
      </Button>
      {isLoginFailed && (
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>Credenciales incorrectas</AlertTitle>
            <AlertDescription>
              Por favor verifica que tus credenciales sean correctas.
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            onClick={onClose}
            position="relative"
            right={-1}
            top={-1}
          />
        </Alert>
      )}
    </Box>
  );
};
