import fp from 'lodash/fp';
import * as Yup from 'yup';

import { ISpare } from '../../../../hooks/useSpares';

export type IUpdateSpareFormValues = Pick<
  ISpare,
  | 'request_date'
  | 'authorization_date'
  | 'reception_date'
  | 'installation_date'
  | 'supplier'
  | 'service_sheet'
>;

const isValidFileSize = fp.curry(
  (size, FILE_SIZE = 1e7) => (size as number) <= FILE_SIZE,
);

const isValidFileFormat = fp.curry(
  (value, formats = ['image/png', 'image/jpg', 'image/jpeg']) =>
    fp.includes(value)(formats),
);

export const ValidationSchema = Yup.object().shape({
  authorization_date: Yup.date(),
  installation_date: Yup.date(),
  reception_date: Yup.date(),
  request_date: Yup.date(),
  service_sheet: Yup.mixed()
    .test('file-size', 'Este campo acepta máximo fotos de 10MB.', (v) => {
      if (fp.isNil(v)) return true;
      if (fp.isString(v)) return true;
      return isValidFileSize(v.size);
    })
    .test('file-format', 'Este campo solo acepta formatos JPG y PNG.', (v) => {
      if (fp.isNil(v)) return true;
      if (fp.isString(v)) return true;
      return isValidFileFormat(v.type);
    }),
  supplier: Yup.string(),
});
