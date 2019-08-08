import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import {wrapStore, alias} from 'webext-redux';


const store = createStore(rootReducer, applyMiddleware(thunk));

wrapStore(store,  {portName: 'APP'});

