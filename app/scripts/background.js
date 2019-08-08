import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import {wrapStore} from 'webext-redux';

const middleware = [
  thunk
];

const store = createStore(rootReducer, applyMiddleware(...middleware));

wrapStore(store,  {portName: 'APP'});

