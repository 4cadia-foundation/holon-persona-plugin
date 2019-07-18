import * as ActionTypes from '../../constants/actionsTypes';

const INITIAL_STATE = {
  accounts: []
};

export default function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SET_ACCOUNTS:
      return {...state, accounts: action.accounts};
    break;
    case ActionTypes.SET_ACCOUNTS_ERROR:
      return {...state, error: action.error};
    break;
    default:
      return state;
  }
}

