import * as Yup from 'yup';

import { ISpare } from '../../../../hooks/useSpares';

export type IRegisterSpareFormValues = Pick<
  ISpare,
  'name' | 'folio' | 'store' | 'unit' | 'store_manager' | 'supplier'
>;

export const ValidationSchema = Yup.object().shape({
  folio: Yup.string().required('El folio es requerido'),
  name: Yup.string().required('El nombre es requerido'),
  store: Yup.string().required('La tienda es requerida'),
  store_manager: Yup.string().required(
    'El encargado de la tienda es requerido',
  ),
  supplier: Yup.string().required('El proveedor es requerido'),
  unit: Yup.string().required('La unidad es requerida'),
});
