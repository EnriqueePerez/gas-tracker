import * as Yup from 'yup';

import { ISpare } from '../../../../hooks/useSpares';

export type IRegisterSpareFormValues = Pick<
  ISpare,
  'name' | 'folio' | 'store' | 'unit' | 'store_manager' | 'is_delayed'
>;

export const ValidationSchema = Yup.object().shape({
  folio: Yup.string().required('El folio es requerido'),
  is_delayed: Yup.string().required('El estatus es requerido'),
  name: Yup.string().required('El nombre es requerido'),
  store: Yup.string().required('La tienda es requerida'),
  unit: Yup.string().required('La unidad es requerida'),
});
