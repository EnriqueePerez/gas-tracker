import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { forwardRef } from 'react';

import { InputField, SelectField } from '../../inputs';
import { IRegisterSpareFormValues, ValidationSchema } from './helpers';

export interface IRegisterSpareFormProps extends Omit<BoxProps, 'onSubmit'> {
  /**
   * RegisterSpare form initial values, default is `{ id: '', refrigerant: '', tankWeight: 0 }`.
   */
  initialValues?: IRegisterSpareFormValues;
  /**
   * RegisterSpare form on submit handler.
   */
  onSubmit: (
    v: IRegisterSpareFormValues,
    h?: FormikHelpers<IRegisterSpareFormValues>,
  ) => void;
  /**
   * If `true`, the submit button will be rendered on the form.
   */
  showSubmitButton?: boolean;
}

export const RegisterSpareForm = forwardRef<
  FormikProps<IRegisterSpareFormValues>,
  IRegisterSpareFormProps
>((props, ref) => {
  const { initialValues, onSubmit, showSubmitButton, ...rest } = props;

  return (
    <Formik
      initialValues={initialValues as IRegisterSpareFormValues}
      innerRef={ref}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Box as={Form} id="create-tank-form" {...rest}>
          <InputField
            helperText="Nombre de la refacción"
            label="Nombre"
            mb={4}
            name="name"
            type="text"
          />

          <InputField
            helperText="Folio del reporte"
            label="Folio"
            mb={4}
            name="folio"
            type="text"
          />

          <InputField
            helperText="Tienda que necesita la refacción"
            label="Tienda"
            mb={4}
            name="store"
            type="text"
          />

          <InputField
            helperText="Encargado de la tienda"
            label="Encargado"
            mb={4}
            name="store_manager"
            type="text"
          />

          <SelectField
            helperText="Equipo que requiere la refacción"
            label="Equipo"
            mb={4}
            name="unit"
            options={[
              'Conservación 1',
              'Conservación 2',
              'Cerveza',
              'Hielo',
              'Koxka',
              'Salchikoxka',
              'Vitrina',
              'Imbera',
              'Enfriador de Corona',
              'Clima 1',
              'Clima 2',
              'Clima 3',
            ]}
            placeholder="Seleccione el equipo"
          />

          <InputField
            helperText="Proveedor de la refacción"
            label="Proveedor"
            mb={4}
            name="supplier"
            type="text"
          />

          {showSubmitButton ? (
            <Button
              colorScheme="facebook"
              isDisabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              size="sm"
              type="submit"
              width="100%"
            >
              Registrar refacción
            </Button>
          ) : null}
        </Box>
      )}
    </Formik>
  );
});

RegisterSpareForm.defaultProps = {
  initialValues: {
    folio: '',
    name: '',
    store: '',
    store_manager: '',
    supplier: '',
    unit: '',
  },
  showSubmitButton: false,
};

RegisterSpareForm.displayName = 'RegisterSpareForm';
