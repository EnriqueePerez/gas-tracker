import * as Yup from 'yup';

import { ISpare } from '../../../../hooks/useSpares';

export type IUpdateSpareFormValues = Pick<
  ISpare,
  'request_date' | 'authorization_date' | 'reception_date' | 'installation_date'
>;

export const ValidationSchema = Yup.object().shape({
  authorization_date: Yup.date(),
  installation_date: Yup.date(),
  reception_date: Yup.date(),
  request_date: Yup.date(),
});
