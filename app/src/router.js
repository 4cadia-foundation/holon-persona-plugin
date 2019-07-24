import Welcome from './modules/Welcome/Welcome';
import ChooseCreateOrImport from './modules/ChooseCreateOrImport/ChooseCreateOrImport';
import ChooseCreateIdentityOrHome from './modules/ChooseCreateIdentityOrHome/ChooseCreateIdentityOrHome';
import ImportWallet from './modules/ImportWallet/ImportWallet';
import WalletPassword from './modules/WalletPassword/WalletPassword';
import Notfound from './modules/Notfound/Notfound';
import CreateIdentity from './modules/CreateIdentity/CreateIdentity';
import AddInformation from './modules/AddInformation/AddInformation';
import Home from './modules/Home/Home';
import WelcomeBack from './modules/WelcomeBack/WelcomeBack';
import BackupPhrase from './modules/BackupPhrase/BackupPhrase';
import Menu from './modules/Menu/Menu';
import Profile from './modules/Profile/Profile'
import Notifications from './modules/Notifications/Notifications';

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
    path: '/choosecreateidentityorhome',
    component: ChooseCreateIdentityOrHome,
    exact: false
  },
  {
    path: '/welcomeback',
    component: WelcomeBack,
    exact: false
  },
  {
    path: '/menu',
    component: Menu,
    exact: false
  },
  {
    path: '/backupphrase',
    component: BackupPhrase,
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
    path: '/profile',
    component: Profile,
    exact: false
  },
  { path: '/notifications',
    component: Notifications,
    exact: false
  },
  {
    path: '/menu',
    component: Menu,
    exact: false
  },
  {
    component: Notfound,
    exact: false
  },
];

export default routers;
