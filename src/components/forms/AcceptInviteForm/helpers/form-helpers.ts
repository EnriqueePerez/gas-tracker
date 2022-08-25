import * as Yup from 'yup';

export interface IAcceptInviteFormValues {
  /**
   * User password.
   */
  password?: string;
}

export const ValidationSchema = Yup.object().shape({
  password: Yup.string().required('La contraseña es requerida'),
});
