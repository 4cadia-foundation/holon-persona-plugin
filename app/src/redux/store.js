import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

import { checkPersonaStorage } from '../redux/actions/persona';
import { checkWalletStorage, hasWallet } from '../redux/actions/wallet';

import thunk from 'redux-thunk';
import toastMiddleware from './middleware/toastMiddleware';

const store = createStore(rootReducer,  applyMiddleware(thunk, toastMiddleware));
store.dispatch(hasWallet);
store.dispatch(checkPersonaStorage);
store.dispatch(checkWalletStorage);

export default store;
