import AddInformation from './modules/AddInformation/AddInformation';
import BackupPhrase from './modules/BackupPhrase/BackupPhrase';
import ChooseCreateIdentityOrHome from './modules/ChooseCreateIdentityOrHome/ChooseCreateIdentityOrHome';
import ChooseCreateOrImport from './modules/ChooseCreateOrImport/ChooseCreateOrImport';
import CreateIdentity from './modules/CreateIdentity/CreateIdentity';
import DepositButton from './components/DepositButton/Deposit';
import Home from './modules/Home/Home';
import ImportWallet from './modules/ImportWallet/ImportWallet';
import IntroductionHolon from './modules/IntroductionHolon/IntroductionHolon'
import Menu from  './modules/Menu/Menu';
import Notfound from './modules/Notfound/Notfound';
import Notifications from './modules/Notifications/Notifications';
import Profile from './modules/Profile/Profile'
import SendEth from './modules/SendEth/SendEth';
import ValidateInformation from './modules/ValidateInformation/ValidateInformation';
import WalletPassword from './modules/WalletPassword/WalletPassword';
import WelcomeBack from './modules/WelcomeBack/WelcomeBack';

let routers = [
  {
    path: '/',
    component: IntroductionHolon,
    exact: true
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
    path: '/validateinformation',
    component: ValidateInformation,
    exact: false
  },
  {
    path: '/depositbutton',
    component: DepositButton,
    exact: false
  },
  {
    path: '/sendeth',
    component: SendEth,
    exact: false
  },
  {
    component: Notfound,
    exact: false
  },
];

export default routers;
