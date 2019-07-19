import Welcome from './modules/Welcome/Welcome';
import ChooseCreateOrImport from './modules/ChooseCreateOrImport/ChooseCreateOrImport';
import ImportWallet from './modules/ImportWallet/ImportWallet';
import WalletPassword from './modules/WalletPassword/WalletPassword';
import Notfound from './modules/Notfound/Notfound';
import CreateIdentity from './modules/CreateIdentity/CreateIdentity';
import AddInformation from './modules/AddInformation/AddInformation';
import Home from './modules/Home/Home';
import Menu from  './modules/Menu/Menu';
import ValidateInformation from './modules/ValidateInformation/ValidateInformation';

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
    path: '/walletpassword',
    component: WalletPassword,
    exact: false
  },
  {
    path: '/choosecreateorimport',
    component: ChooseCreateOrImport,
    exact: false
  },
  {
    path: '/home',
    component: Home,
    exact: false
  },
  {
    path: '/createidentity',
    component: CreateIdentity,
    exact: false
  },
  {
    path: '/addinformation',
    component: AddInformation,
    exact: false
  },
  {
    path: '/menu',
    component: Menu,
    exact: false
  },
  {
    path: '/validateinformation',
    component: ValidateInformation,
    exact: false
  },
  {
    component: Notfound,
    exact: false
  },
];

export default routers;
