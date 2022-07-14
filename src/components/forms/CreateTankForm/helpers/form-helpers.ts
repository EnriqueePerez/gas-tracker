import * as Yup from 'yup';

import { ITank } from '../../../../hooks/useTanks';

export type ICreateTankFormValues = Pick<
  ITank,
  'id' | 'refrigerant' | 'tankWeight'
>;

export const ValidationSchema = Yup.object().shape({
  id: Yup.string().required(),
  refrigerant: Yup.string().required(),
  tankWeight: Yup.number().min(10).required(),
});
