import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from 'reactfire';

interface ILogin {
  email: string | null;
  password: string | null;
}

export const useFirebaseLogin = () => {
  const auth = useAuth();

  const signIn = async ({ email, password }: ILogin) =>
    signInWithEmailAndPassword(auth, email as string, password as string);

  return { signIn };
};
