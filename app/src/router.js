import Welcome from './modules/Welcome/Welcome';
import ChooseCreateOrImport from './modules/ChooseCreateOrImport/ChooseCreateOrImport';
import ChooseCreateIdentityOrHome from './modules/ChooseCreateIdentityOrHome/ChooseCreateIdentityOrHome';
import ImportWallet from './modules/ImportWallet/ImportWallet';
import WalletPassword from './modules/WalletPassword/WalletPassword';
import Notfound from './modules/Notfound/Notfound';
import CreateIdentity from './modules/CreateIdentity/CreateIdentity';
import AddInformation from './modules/AddInformation/AddInformation';
import Home from './modules/Home/Home';
import Menu from './modules/Menu/Menu';
import ValidateInformation from './modules/ValidateInformation/ValidateInformation';
import BackupPhrase from './modules/BackupPhrase/BackupPhrase';
import WelcomeBack from './modules/WelcomeBack/WelcomeBack';
import Profile from './modules/Profile/Profile';
import Notifications from './modules/Notifications/Notifications';
import DepositButton from './components/DepositButton/Deposit';
import SendEth from './modules/SendEth/SendEth';

const routers = [
  {
    path: '/',
    exact: true,
    component: Welcome,
  },
  {
    path: '/importwallet',
    component: ImportWallet,
    exact: false,
  },
  {
    path: '/choosecreateidentityorhome',
    component: ChooseCreateIdentityOrHome,
    exact: false,
  },
  {
    path: '/welcomeback',
    component: WelcomeBack,
    exact: false,
  },
  {
    path: '/menu',
    component: Menu,
    exact: false,
  },
  {
    path: '/backupphrase',
    component: BackupPhrase,
    exact: false,
  },
  {
    path: '/walletpassword',
    component: WalletPassword,
    exact: false,
  },
  {
    path: '/choosecreateorimport',
    component: ChooseCreateOrImport,
    exact: false,
  },
  {
    path: '/home',
    component: Home,
    exact: false,
  },
  {
    path: '/createidentity',
    component: CreateIdentity,
    exact: false,
  },
  {
    path: '/addinformation',
    component: AddInformation,
    exact: false,
  },
  {
    path: '/profile',
    component: Profile,
    exact: false,
  },
  {
    path: '/notifications',
    component: Notifications,
    exact: false,
  },
  {
    path: '/menu',
    component: Menu,
    exact: false,
  },
  {
    path: '/validateinformation',
    component: ValidateInformation,
    exact: false,
  },
  {
    path: '/depositbutton',
    component: DepositButton,
    exact: false,
  },
  {
    path: '/sendeth',
    component: SendEth,
    exact: false,
  },
  {
    component: Notfound,
    exact: false,
  },
];

export default routers;
