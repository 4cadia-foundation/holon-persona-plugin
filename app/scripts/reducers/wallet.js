import * as ActionTypes from '../../src/constants/actionsTypes';
import * as moment from 'moment';

const INITIAL_STATE = {
  address: '',
  seed:'',
  mnemonic: '',
  hasWallet: false,
  error: '',
  ethersWallet: {},
  activeDate: null
};

export default function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ACCOUNTS:
      return {...state, ethersWallet: action.wallet, address: action.address, mnemonic: action.mnemonic, example: action, activeDate: moment()};
    break;
    case ActionTypes.SET_WALLET_CREATE:
      return {...state, accounts: action.accounts, activeDate: moment()};
      break;
    case ActionTypes.SET_ACCOUNTS_ERROR:
      return {...state, error: action.error, activeDate: null};
    break;
    case ActionTypes.OPEN_WALLET:
      return {...state, ethersWallet: action.wallet, address: action.address, activeDate: moment()};
    break;
    case ActionTypes.HAS_WALLET:
      return {...state, hasWallet: action.hasWallet};
    break;
    default:
      return state;
  }
}
