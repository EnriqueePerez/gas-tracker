import { Route, Routes } from 'react-router-dom';

import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { CreateTankPage } from '../CreateTankPage';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

export const App = () => (
  <>
    <ColorModeSwitcher position="fixed" right={4} top={4} />

    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<CreateTankPage />} path="/create-tank" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  </>
);
