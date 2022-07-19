import { nanoid } from 'nanoid';
import { Route, Routes } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { LoginPage } from '../LoginPage';
import { NotFoundPage } from '../NotFoundPage';
import { Protected } from './components/Protected';
import { ROUTES } from './helpers/router-helpers';

export const App = (): JSX.Element | null => {
  const { status } = useSigninCheck();

  if (status === 'loading') return null;

  return (
    <>
      <ColorModeSwitcher position="fixed" right={4} top={4} />

      <Routes>
        <Route element={<Protected />}>
          {ROUTES.map(({ element: Element, path }) => (
            <Route key={nanoid()} element={<Element />} path={path} />
          ))}
        </Route>

        <Route element={<LoginPage />} path="/login" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
};
