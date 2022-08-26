import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from 'reactfire';

import { ILoginFormValues } from '../components/forms/LoginForm/helpers/form-helpers';

export const useFirebaseLogin = () => {
  const auth = useAuth();

  const login = async ({ email, password }: ILoginFormValues) =>
    signInWithEmailAndPassword(auth, email as string, password as string);

  const logout = async () => signOut(auth);

  return { login, logout };
};
