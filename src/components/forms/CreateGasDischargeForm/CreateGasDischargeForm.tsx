import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { InputField, SelectField, TextAreaField } from '../../inputs';
import { ICreateGasDischargeFormValues, ValidationSchema } from './helpers';

export interface ICreateGasDischargeFormProps
  extends Omit<BoxProps, 'onSubmit'> {
  /**
   * Create Gas Discharge initial values, default is `
  {
    actual_tank_weight: 0,
    comments: '',
    folio: '',
    owner_name: '',
    store: '',
    tank_id: '',
    timedate_of_start: '',
  }`.
   */
  initialValues?: ICreateGasDischargeFormValues;
  /**
   * Create Gas Discharge form on submit handler.
   */
  onSubmit: (
    v: ICreateGasDischargeFormValues,
    h?: FormikHelpers<ICreateGasDischargeFormValues>,
  ) => void;
}

export const CreateGasDischargeForm = (props: ICreateGasDischargeFormProps) => {
  const { initialValues, onSubmit, ...rest } = props;

  const defineMaxTankWeight = (unit: string) => {
    switch (unit) {
      case 'Conservación 1':
        return 4;
      case 'Conservación 2':
        return 5;
      case 'Cerveza':
      case 'Hielo':
        return 3.5;
      case 'Koxka':
      case 'Salchikoxka':
        return 1.1;
      case 'Vitrina':
      case 'Imbera':
      case 'Enfriador de cargas':
        return 0.5;
      default:
        return 0;
    }
  };

  return (
    <Formik
      initialValues={initialValues as ICreateGasDischargeFormValues}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Box as={Form} {...rest}>
          <InputField
            helperText='Folio de la boya o "sobrecalentamiento"'
            label="Folio"
            mb={4}
            name="folio"
            type="text"
          />

          <InputField
            datalist={[
              'Coatzacoalcos',
              'Pajaritos',
              'Cardel',
              'Emiliano Zapata',
            ]}
            helperText="En caso de no encontrar la tienda en la lista, agreguela"
            label="Tienda"
            mb={4}
            name="store"
            type="text"
          />

          <SelectField
            helperText="Equipo que recibio el gas"
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
            ]}
            placeholder="Seleccione el equipo"
          />

          <InputField
            helperText="Hora en que se empezó a cargar el gas"
            label="Hora de inicio de carga"
            mb={4}
            name="timedate_of_start"
            type="time"
          />

          <InputField
            helperText="Peso de la boya luego de cargar el gas al equipo, en kilos"
            label="Peso actual de la boya (kg)"
            mb={4}
            name="actual_tank_weight"
            type="number"
          />

          <TextAreaField
            label="Comentarios"
            mb={4}
            name="comments"
            placeholder="Comentarios adicionales en caso de ser necesarios"
          />

          <Button
            colorScheme="facebook"
            isDisabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
            size="sm"
            type="submit"
            width="100%"
          >
            Guardar registro
          </Button>
        </Box>
      )}
    </Formik>
  );
};

CreateGasDischargeForm.defaultProps = {
  initialValues: {
    actual_tank_weight: 0,
    comments: '',
    folio: '',
    owner_name: '',
    store: '',
    tank_id: '',
    timedate_of_start: '',
  },
};
