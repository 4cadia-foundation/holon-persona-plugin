import * as ActionTypes from '../../constants/actionsTypes';

const INITIAL_STATE = {
  address: '',
  seed:'',
  mnemonic: '',
  hasWallet: false,
  error: '',
  hasCheckedWalletStorage: false,
  ethersWallet: {}
};

export default function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ACCOUNTS:
      return {...state, ethersWallet: action.wallet, address: action.address, mnemonic: action.mnemonic, hasWallet: true};
    break;
    case ActionTypes.SET_WALLET_CREATE:
      return {...state, accounts: action.accounts};
      break;
    case ActionTypes.SET_ACCOUNTS_ERROR:
      return {...state, error: action.error};
    break;
    case ActionTypes.OPEN_WALLET:
      return {...state, ethersWallet: action.wallet, address: action.address};
    break;
    case ActionTypes.HAS_WALLET:
      return {...state, hasWallet: action.hasWallet};
    break;  
    case ActionTypes.HAS_CHECKED_WALLET_STORAGE:
      console.log('reducer/HAS_CHECKED_WALLET_STORAGE')
      return { ...state, hasCheckedWalletStorage: true }
    break;
    default:
      return state; 
  }
}