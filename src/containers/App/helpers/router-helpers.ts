import { CreateGasDischargePage } from '../../CreateGasDischargePage';
import { CreateTankPage } from '../../CreateTankPage';
import { HomePage } from '../../HomePage';
import { TankInfoPage } from '../../TankInfoPage';
import { TransferTankPage } from '../../TransferTankPage';

export const ROUTES = [
  {
    element: HomePage,
    path: '/',
  },
  {
    element: CreateTankPage,
    path: '/create-tank',
  },
  {
    element: TransferTankPage,
    path: '/transfer-tank',
  },
  {
    element: CreateGasDischargePage,
    path: '/create-gas-discharge',
  },
  {
    element: TankInfoPage,
    path: '/tank-info',
  },
];
