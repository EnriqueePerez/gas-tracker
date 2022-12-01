import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { InputField } from '../../inputs';
import { IUpdateSpareFormValues, ValidationSchema } from './helpers';

export interface IUpdateSpareFormProps extends Omit<BoxProps, 'onSubmit'> {
  /**
   * Update Spare form initial values`.
   */
  initialValues: IUpdateSpareFormValues;
  /**
   * Update Spare form on submit handler.
   */
  onSubmit: (
    v: IUpdateSpareFormValues,
    h?: FormikHelpers<IUpdateSpareFormValues>,
  ) => void;
}

export const UpdateSpareForm = (props: IUpdateSpareFormProps) => {
  const { initialValues, onSubmit, ...rest } = props;

  const {
    request_date,
    reception_date,
    authorization_date,
    installation_date,
  } = initialValues;

  return (
    <Formik
      initialValues={initialValues as IUpdateSpareFormValues}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Box as={Form} {...rest}>
          <InputField
            helperText="Fecha en la que se solicito la refacción"
            isDisabled={!!request_date}
            label="Fecha de solicitud"
            mb={4}
            name="request_date"
            type="date"
          />

          <InputField
            helperText="Fecha en la que se autorizó la refacción"
            isDisabled={!!authorization_date}
            label="Fecha de autorización"
            mb={4}
            name="authorization_date"
            type="date"
          />

          <InputField
            helperText="Fecha en la que se recibio la refacción"
            isDisabled={!!reception_date}
            label="Fecha de recepción"
            mb={4}
            name="reception_date"
            type="date"
          />

          <InputField
            helperText="Fecha en la que se instalo la refacción"
            isDisabled={!!installation_date}
            label="Fecha de instalación"
            mb={4}
            name="installation_date"
            type="date"
          />

          <Button
            colorScheme="facebook"
            isDisabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
            size="sm"
            type="submit"
            width="100%"
          >
            Actualizar refacción
          </Button>
        </Box>
      )}
    </Formik>
  );
};
