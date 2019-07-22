import * as ActionTypes from '../../constants/actionsTypes';

const INITIAL_STATE = {
  address: '',
  seed:'',
  mnemonic: '',
  ethersWallet: {}
};

export default function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ACCOUNTS:
      return {...state, ethersWallet: action.wallet, address: action.address};
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
    default:
      return state;
  }
}

