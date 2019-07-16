import Welcome from './modules/Welcome/Welcome';
import ImportWallet from './modules/ImportWallet/ImportWallet';
import Notfound from "./modules/Notfound/Notfound";


let routers = [
  {
    path: '/',
    exact: true,
    component: Welcome
  },
  {
    path: '/importwallet',
    component: ImportWallet,
    exact: false
  },
  {
    component: Notfound,
    exact: false
  }

];

export default routers;
