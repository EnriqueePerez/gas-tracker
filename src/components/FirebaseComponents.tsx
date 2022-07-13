import { getAuth } from 'firebase/auth';
import { AuthProvider, useFirebaseApp } from 'reactfire';

export const FirebaseComponents = ({ children }: React.PropsWithChildren) => {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  const auth = getAuth(app);

  // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};
