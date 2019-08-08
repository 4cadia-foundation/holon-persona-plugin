import * as Types from '../constants/types';

const INITIAL_STATE = {
  address: '',
  seed:'',
  mnemonic: '',
  hasWallet: false,
  error: '',
  ethersWallet: {}
};

export default function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case Types.SET_ACCOUNTS:
      return {...state, ethersWallet: action.wallet, address: action.address, mnemonic: action.mnemonic};
    break;
    case Types.SET_WALLET_CREATE:
      return {...state, accounts: action.accounts};
      break;
    case Types.SET_ACCOUNTS_ERROR:
      return {...state, error: action.error};
    break;
    case Types.OPEN_WALLET:
      return {...state, ethersWallet: action.wallet, address: action.address};
    break;
    case Types.HAS_WALLET:
      return {...state, hasWallet: action.hasWallet};
    break;
    default:
      return state;
  }
}
