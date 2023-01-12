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
  | 'register_of_photo'
>;

export const ValidationSchema = (
  tankWeight: number,
  initialWeight: number,
  refrigerant: string,
) =>
  Yup.object().shape({
    actual_tank_weight: Yup.number()
      .positive()
      .when('unit', (unit, field) => {
        const gasWeight = () => {
          switch (refrigerant) {
            case 'R22':
              return 13.6;
            case 'R404':
              return 10.89;
            case 'R134':
              return 13.62;
            case 'R410':
            case 'R449':
              return 11.35;
            default:
              return 0;
          }
        };
        switch (unit) {
          case 'Conservación 1': {
            let minWeight = tankWeight - 4;
            if (minWeight <= 0 || minWeight < tankWeight) {
              minWeight = initialWeight - gasWeight();
            }
            return field
              .min(minWeight, `No puede ser menor a ${minWeight}`)
              .max(tankWeight, `No puede ser mayor a ${tankWeight}`);
          }
          case 'Conservación 2':
          case 'Clima 1':
          case 'Clima 2':
          case 'Clima 3': {
            let minWeight = tankWeight - 6;
            if (minWeight <= 0 || minWeight < tankWeight) {
              minWeight = initialWeight - gasWeight();
            }
            return field
              .min(minWeight, `No puede ser menor a ${minWeight}`)
              .max(tankWeight, `No puede ser mayor a ${tankWeight}`);
          }
          case 'Cerveza':
          case 'Hielo': {
            let minWeight = tankWeight - 3.5;
            if (minWeight <= 0 || minWeight < tankWeight) {
              minWeight = initialWeight - gasWeight();
            }
            return field
              .min(minWeight, `No puede ser menor a ${minWeight}`)
              .max(tankWeight, `No puede ser mayor a ${tankWeight}`);
          }
          case 'Koxka':
          case 'Salchikoxka': {
            let minWeight = tankWeight - 1.1;
            if (minWeight <= 0 || minWeight < tankWeight) {
              minWeight = initialWeight - gasWeight();
            }
            return field
              .min(minWeight, `No puede ser menor a ${minWeight}`)
              .max(tankWeight, `No puede ser mayor a ${tankWeight}`);
          }
          case 'Vitrina':
          case 'Imbera':
          case 'Enfriador de Corona': {
            let minWeight = tankWeight - 0.9;
            if (minWeight <= 0 || minWeight < tankWeight) {
              minWeight = initialWeight - gasWeight();
            }
            return field
              .min(minWeight, `No puede ser menor a ${minWeight}`)
              .max(tankWeight, `No puede ser mayor a ${tankWeight}`);
          }
          default:
            return field.min(0, 'El valor no puede ser menor a 0');
        }
      }),
    comentarios: Yup.string().optional().default(''),
    folio: Yup.string().required('El folio es requerido'),
    register_of_photo: Yup.string().required('El registro es requerido'),
    store: Yup.string().required('La tienda es requerida'),
    timedate_of_start: Yup.string().required('La hora de inicio es requerida'),
    unit: Yup.string().required('La unidad es requerida'),

    // TODO: add left validations

    // new_owner_name: Yup.string().required(),
    // tank_id: Yup.string().required(),
  });
