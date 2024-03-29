import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { InputField } from '../../inputs';
import { ILoginFormValues, ValidationSchema } from './helpers';

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
      {({ isSubmitting, isValid }) => (
        <Box as={Form} {...rest}>
          <InputField label="Email" mb={4} name="email" type="email" />

          <InputField
            label="Contraseña"
            mb={6}
            name="password"
            type="password"
          />

          <Button
            colorScheme="facebook"
            isDisabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
            size="sm"
            type="submit"
            width="100%"
          >
            Iniciar Sesión
          </Button>
        </Box>
      )}
    </Formik>
  );
};

LoginForm.defaultProps = {
  initialValues: { email: '', password: '' },
};
