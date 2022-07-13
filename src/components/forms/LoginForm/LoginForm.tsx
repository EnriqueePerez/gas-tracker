import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { InputField } from '../../inputs';
import { ILoginFormValues } from './helpers';
import { ValidationSchema } from './helpers/form-helpers';

export interface ILoginFormProps extends Omit<BoxProps, 'onSubmit'> {
  /**
   * Login form initial values, default is `{ email: '', password: '' }`.
   */
  initialValues?: ILoginFormValues;
  /**
   * Login form on submit handler.
   */
  onSubmit: (v: ILoginFormValues, h?: FormikHelpers<ILoginFormValues>) => void;
}

export const LoginForm = (props: ILoginFormProps) => {
  const { initialValues, onSubmit, ...rest } = props;

  return (
    <Formik
      initialValues={initialValues as ILoginFormValues}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      <Box as={Form} {...rest}>
        <InputField label="Email" mb={4} name="email" type="email" />

        <InputField label="Password" mb={6} name="password" type="password" />

        <Button colorScheme="blue" size="sm" type="submit" width="100%">
          Iniciar Sesión
        </Button>
      </Box>
    </Formik>
  );
};

LoginForm.defaultProps = {
  initialValues: { email: '', password: '' },
};
