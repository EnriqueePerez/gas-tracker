import * as Yup from 'yup';

import { ITank } from '../../../../hooks/useTanks';

export type ICreateTankFormValues = Pick<
  ITank,
  'id' | 'refrigerant' | 'tank_weight'
>;

export const ValidationSchema = Yup.object().shape({
  id: Yup.string().required(),
  refrigerant: Yup.string().required(),
  tank_weight: Yup.number()
    .required()
    .when('refrigerant', (refrigerant, field) => {
      switch (refrigerant) {
        case 'R22':
          return field
            .min(13.6, 'No puede ser menor a 13.6')
            .max(16.6, 'No puede ser mayor a 16.6');
        case 'R404':
          return field
            .min(10.89, 'No puede ser menor a 10.89')
            .max(13.89, 'No puede ser mayor a 13.89');
        case 'R134':
          return field
            .min(13.62, 'No puede ser menor a 13.62')
            .max(16.62, 'No puede ser mayor a 16.62');
        case 'R410':
        case 'R449':
          return field
            .min(11.35, 'No puede ser menor a 11.35')
            .max(14.91, 'No puede ser mayor a 14.91');
        default:
          return field.min(0, 'No puede ser menor a 0');
      }
    }),
});
