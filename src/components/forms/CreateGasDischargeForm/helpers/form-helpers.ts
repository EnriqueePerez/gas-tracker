import * as Yup from 'yup';

import { IGasDischarge } from '../../../../hooks/useGasDischarges';

export type ICreateGasDischargeFormValues = Pick<
  IGasDischarge,
  | 'comments'
  | 'owner_name'
  | 'actual_tank_weight'
  | 'timedate_of_start'
  | 'store'
  | 'folio'
  | 'tank_id'
>;

export const ValidationSchema = Yup.object().shape({
  new_owner_name: Yup.string().required(),
  tank_id: Yup.string().required(),
});
