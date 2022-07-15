import * as Yup from 'yup';

import { ITank } from '../../../../hooks/useTanks';

export type ICreateTankFormValues = Pick<
  ITank,
  'id' | 'refrigerant' | 'tank_weight'
>;

export const ValidationSchema = Yup.object().shape({
  id: Yup.string().required(),
  refrigerant: Yup.string().required(),
  tank_weight: Yup.number().min(10).required(),
});
