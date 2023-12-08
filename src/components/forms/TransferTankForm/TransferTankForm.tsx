import { Box, BoxProps, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { IUser } from '../../../hooks/useUsers';
import { SelectField } from '../../inputs';
import { ITransferTankFormValues, ValidationSchema } from './helpers';

export interface ITransferTankFormProps extends Omit<BoxProps, 'onSubmit'> {
  /**
   * Transfer Tank form initial values, default is `{ newOwnerName: '', tankId: '' }`.
   */
  initialValues?: ITransferTankFormValues;
  /**
   * Transfer Tank form on submit handler.
   */
  onSubmit: (
    v: ITransferTankFormValues,
    h?: FormikHelpers<ITransferTankFormValues>,
  ) => void;

  /**
   * Current tanks id list.
   */
  tanks: string[];
  /**
   * Current users lists.
   */
  users: IUser[];
}

export const TransferTankForm = (props: ITransferTankFormProps) => {
  const { initialValues, onSubmit, tanks, users, ...rest } = props;

  return (
    <Formik
      initialValues={initialValues as ITransferTankFormValues}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Box as={Form} {...rest}>
          <SelectField
            helperText="Seleccione la boya a entregar"
            isDisabled
            label="Identificador de boya"
            mb={4}
            name="tank_id"
            options={tanks}
            placeholder="Seleccione la boya"
          />

          <SelectField
            helperText="Usuario quien recibe la boya"
            label="Receptor/Nuevo dueño"
            mb={4}
            name="new_owner_name"
            options={users.map(
              (user) => (user.shortenedName as string) || (user.name as string),
            )}
            placeholder="Seleccione el usuario"
          />

          <Button
            colorScheme="facebook"
            isDisabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
            size="sm"
            type="submit"
            width="100%"
          >
            Transferir
          </Button>
        </Box>
      )}
    </Formik>
  );
};

TransferTankForm.defaultProps = {
  initialValues: { newOwnerName: '', tankId: '', tanks: [] },
};
