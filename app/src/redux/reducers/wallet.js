import * as ActionTypes from '../../constants/actionsTypes';

const INITIAL_STATE = {
  address: '',
  seed: '',
  mnemonic: '',
  hasWallet: false,
  error: '',
  ethersWallet: {},
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_ACCOUNTS:
      return {
        ...state, error: '', ethersWallet: action.wallet, address: action.address, mnemonic: action.mnemonic, openedWallet: true,
      };
    case ActionTypes.SET_WALLET_CREATE:
      return { ...state, accounts: action.accounts };
    case ActionTypes.SET_ACCOUNTS_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.OPEN_WALLET:
      return { ...state, error: '', openedWallet: false };
    case ActionTypes.OPEN_WALLET_ERROR:
      return { ...state, error: action.error.message, openedWallet: false };
    case ActionTypes.HAS_WALLET:
      return { ...state, hasWallet: action.hasWallet };
    default:
      return state;
  }
}