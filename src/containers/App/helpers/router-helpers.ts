import { CreateGasDischargePage } from '../../CreateGasDischargePage';
import { CreateTankPage } from '../../CreateTankPage';
import { HomePage } from '../../HomePage';
import { SparesInfoPage } from '../../SparesInfoPage';
import { TankInfoPage } from '../../TankInfoPage';
import { TransferTankPage } from '../../TransferTankPage';
import { UpdateSparePage } from '../../UpdateSparePage';

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
  {
    element: SparesInfoPage,
    path: '/spares',
  },
  {
    element: UpdateSparePage,
    path: '/update-spare',
  },
];
