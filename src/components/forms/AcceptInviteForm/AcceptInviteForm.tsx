import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { InputField } from '../../inputs';
import { IAcceptInviteFormValues, ValidationSchema } from './helpers';

export interface IAcceptInviteFormProps extends Omit<BoxProps, 'onSubmit'> {
  /**
   * Accept Invite form initial values, default is `{ password: '' }`.
   */
  initialValues?: IAcceptInviteFormValues;
  /**
   * Accept Invite form on submit handler.
   */
  onSubmit: (
    v: IAcceptInviteFormValues,
    h?: FormikHelpers<IAcceptInviteFormValues>,
  ) => void;
}

export const AcceptInviteForm = (props: IAcceptInviteFormProps) => {
  const { initialValues, onSubmit, ...rest } = props;

  return (
    <Formik
      initialValues={initialValues as IAcceptInviteFormValues}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      <Box as={Form} {...rest}>
        <InputField label="Contraseña" mb={6} name="password" type="password" />
      </Box>
    </Formik>
  );
};

AcceptInviteForm.defaultProps = {
  initialValues: { password: '' },
};
