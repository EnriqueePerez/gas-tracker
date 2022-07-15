import * as Yup from 'yup';

import { ISendedTank } from '../../../../hooks/useSendedTanks';

export type ITransferTankFormValues = Pick<
  ISendedTank,
  'new_owner_name' | 'tank_id'
>;

export const ValidationSchema = Yup.object().shape({
  new_owner_name: Yup.string().required(),
  tank_id: Yup.string().required(),
});
