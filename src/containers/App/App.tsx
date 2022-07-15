import { Route, Routes } from 'react-router-dom';

import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { CreateGasDischargePage } from '../CreateGasDischargePage/CreateGasDischargePage';
import { CreateTankPage } from '../CreateTankPage';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { TransferTankPage } from '../TransferTankPage/TransferTankPage';

export const App = () => (
  <>
    <ColorModeSwitcher position="fixed" right={4} top={4} />

    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<CreateTankPage />} path="/create-tank" />
      <Route element={<TransferTankPage />} path="/transfer-tank" />
      <Route
        element={<CreateGasDischargePage />}
        path="/create-gas-discharge"
      />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  </>
);
