import { Navigate, Outlet } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

export const Protected = (): JSX.Element => {
  const { data } = useSigninCheck();

  if (!data?.signedIn) return <Navigate to="/login" />;

  return <Outlet />;
};
