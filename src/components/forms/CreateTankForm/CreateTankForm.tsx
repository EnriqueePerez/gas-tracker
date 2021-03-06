import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { forwardRef } from 'react';

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
  /**
   * If `true`, the submit button will be rendered on the form.
   */
  showSubmitButton?: boolean;
}

export const CreateTankForm = forwardRef<
  FormikProps<ICreateTankFormValues>,
  ICreateTankFormProps
>((props, ref) => {
  const { initialValues, onSubmit, showSubmitButton, ...rest } = props;

  return (
    <Formik
      initialValues={initialValues as ICreateTankFormValues}
      innerRef={ref}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Box as={Form} id="create-tank-form" {...rest}>
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
            options={['R22', 'R134', 'R404', 'R410', 'R449']}
            placeholder="Seleccione el equipo"
          />

          <InputField
            helperText="Peso de la boya, en kilos"
            label="Peso de la boya (kg)"
            mb={4}
            name="tank_weight"
            type="number"
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
              Registrar
            </Button>
          ) : null}
        </Box>
      )}
    </Formik>
  );
});

CreateTankForm.defaultProps = {
  initialValues: { id: '', refrigerant: '', tank_weight: 0 },
  showSubmitButton: false,
};

CreateTankForm.displayName = 'CreateTankForm';
