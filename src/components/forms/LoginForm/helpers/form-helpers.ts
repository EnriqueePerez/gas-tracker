import * as Yup from 'yup';

export interface ILoginFormValues {
  /**
   * User email.
   */
  email?: string;
  /**
   * User password.
   */
  password?: string;
}

export const ValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
