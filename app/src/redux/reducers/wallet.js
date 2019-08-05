import * as ActionTypes from '../../constants/actionsTypes';

const INITIAL_STATE = {
  address: '',
  seed:'',
  mnemonic: '',
  hasWallet: false,
  error: '',
  ethersWallet: {}
};

export default function wallet(state = INITIAL_STATE, action) {
  let object = {};

  switch(action.type) {
  case ActionTypes.SET_ACCOUNTS:
    object = {
      ...state,
      ethersWallet: action.wallet,
      address: action.address,
      mnemonic: action.mnemonic };
    break;
  case ActionTypes.SET_WALLET_CREATE:
    object = { ...state, accounts: action.accounts };
    break;
  case ActionTypes.SET_ACCOUNTS_ERROR:
    object = { ...state, error: action.error };
    break;
  case ActionTypes.OPEN_WALLET:
    object = {
      ...state,
      ethersWallet: action.wallet,
      address: action.address };
    break;
  case ActionTypes.HAS_WALLET:
    object = {
      ...state,
      hasWallet: action.hasWallet };
    break;
  default:
    object = state;
  }

  return object;
}
