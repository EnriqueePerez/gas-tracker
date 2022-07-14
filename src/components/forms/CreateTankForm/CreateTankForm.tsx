import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { InputField, SelectField } from '../../inputs';
import { ICreateTankFormValues, ValidationSchema } from './helpers';

export interface ICreateTankFormProps extends Omit<BoxProps, 'onSubmit'> {
  /**
   * CreateTank form initial values, default is `{ id: '', refrigerant: '', tankWeight: 0 }`.
   */
  initialValues?: ICreateTankFormValues;
  /**
   * CreateTank form on submit handler.
   */
  onSubmit: (
    v: ICreateTankFormValues,
    h?: FormikHelpers<ICreateTankFormValues>,
  ) => void;
}

export const CreateTankForm = (props: ICreateTankFormProps) => {
  const { initialValues, onSubmit, ...rest } = props;

  return (
    <Formik
      initialValues={initialValues as ICreateTankFormValues}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Box as={Form} {...rest}>
          <InputField
            helperText="Identificador o serie de la boya"
            label="Identificador o serie"
            mb={4}
            name="id"
            type="text"
          />

          <SelectField
            helperText="Seleccione el refrigerante"
            label="Refrigerante"
            mb={4}
            name="refrigerant"
            placeholder="Seleccione el equipo"
          >
            <option>R22</option>
            <option>R134</option>
            <option>R404</option>
            <option>R410</option>
            <option>R449</option>
          </SelectField>

          <InputField
            helperText="Peso de la boya, en kilos"
            label="Peso de la boya (kg)"
            mb={4}
            name="tankWeight"
            type="number"
          />

          <Button
            colorScheme="blue"
            isDisabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
            size="sm"
            type="submit"
            width="100%"
          >
            Registrar boya
          </Button>
        </Box>
      )}
    </Formik>
  );
};

CreateTankForm.defaultProps = {
  initialValues: { id: '', refrigerant: '', tankWeight: 0 },
};
