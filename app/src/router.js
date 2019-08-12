import Welcome from './modules/Welcome/Welcome';
import ChooseCreateOrImport from './modules/ChooseCreateOrImport/ChooseCreateOrImport';
import ChooseCreateIdentityOrHome from './modules/ChooseCreateIdentityOrHome/ChooseCreateIdentityOrHome';
import ImportWallet from './modules/ImportWallet/ImportWallet';
import WalletPassword from './modules/WalletPassword/WalletPassword';
import Notfound from './modules/Notfound/Notfound';
import CreateIdentity from './modules/CreateIdentity/CreateIdentity';
import AddInformation from './modules/AddInformation/AddInformation';
import Home from './modules/Home/Home';
import Menu from  './modules/Menu/Menu';
import ValidateInformation from './modules/ValidateInformation/ValidateInformation';
import BackupPhrase from './modules/BackupPhrase/BackupPhrase';
import WelcomeBack from './modules/WelcomeBack/WelcomeBack';
import Profile from './modules/Profile/Profile'
import Notifications from './modules/Notifications/Notifications';
import DepositButton from './components/DepositButton/Deposit';
import SendEth from './modules/SendEth/SendEth';

let routers = [
  {
    path: '/',
    exact: true,
    component: Welcome
},
  {
    path: '/importwallet',
    component: ImportWallet,
    exact: false,
    privateRouter: true
  },
  {
    path: '/choosecreateidentityorhome',
    component: ChooseCreateIdentityOrHome,
    exact: false,
    privateRouter: true
  },
  {
    path: '/welcomeback',
    component: WelcomeBack,
    exact: false,
    privateRouter: false
  },
  {
    path: '/menu',
    component: Menu,
    exact: false,
    privateRouter: false
  },
  {
    path: '/backupphrase',
    component: BackupPhrase,
    exact: false,
    privateRouter: false
  },
  {
    path: '/walletpassword',
    component: WalletPassword,
    exact: false,
    privateRouter: true
  },
  {
    path: '/choosecreateorimport',
    component: ChooseCreateOrImport,
    exact: false,
    privateRouter: false
  },
  {
    path: '/home',
    component: Home,
    exact: false,
    privateRouter: false
  },
  {
    path: '/createidentity',
    component: CreateIdentity,
    exact: false,
    privateRouter: true
  },
  {
    path: '/addinformation',
    component: AddInformation,
    exact: false,
    privateRouter: true
  },
  {
    path: '/profile',
    component: Profile,
    exact: false,
    privateRouter: true
  },
  { path: '/notifications',
    component: Notifications,
    exact: false,
    privateRouter: false
  },
  {
    path: '/menu',
    component: Menu,
    exact: false,
    privateRouter: false
  },
  {
    path: '/validateinformation',
    component: ValidateInformation,
    exact: false,
    privateRouter: false
  },
  {
    path: '/depositbutton',
    component: DepositButton,
    exact: false,
    privateRouter: false
  },
  {
    path: '/sendeth',
    component: SendEth,
    exact: false,
    privateRouter: false
  },
  {
    component: Notfound,
    exact: false
  },
];

export default routers;
