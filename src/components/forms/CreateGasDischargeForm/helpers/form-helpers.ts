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
  actual_tank_weight: Yup.number().when('unit', (unit, field) => {
    switch (unit) {
      case 'Conservación 1':
        return field.max(4, 'No puede ser mayor a 4');
      case 'Conservación 2':
        return field.max(5, 'No puede ser mayor a 5');
      case 'Cerveza':
      case 'Hielo':
        return field.max(3.5, 'No puede ser mayor a 3.5');
      case 'Koxka':
      case 'Salchikoxka':
        return field.max(1.1, 'No puede ser mayor a 1.1');
      case 'Vitrina':
      case 'Imbera':
      case 'Enfriador de cargas':
        return field.max(0.5, 'No puede ser mayor a 0.5');
      default:
        return field.max(0, 'El valor no puede ser mayor a 0');
    }
  }),
  // TODO: add left validations
  // new_owner_name: Yup.string().required(),
  // tank_id: Yup.string().required(),
  unit: Yup.string().required(),
});
