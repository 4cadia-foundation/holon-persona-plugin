import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import {wrapStore} from 'webext-redux';


export const store = createStore(rootReducer, applyMiddleware(thunk));

wrapStore(store,  {portName: 'APP'});

