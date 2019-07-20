import * as ActionTypes from '../../constants/actionsTypes';

const INITIAL_STATE = {
  accounts: [],
  seed: '',
  mnemonic: '',
  wallet: {}
};

export default function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ACCOUNTS:
      return {...state, accounts: action.accounts};
    break;
    case ActionTypes.SET_ACCOUNTS_ERROR:
      return {...state, error: action.error};
    break;
    case ActionTypes.OPEN_WALLET:
      return {...state, wallet: action.wallet};
    break;
    default:
      return state;
  }
}

