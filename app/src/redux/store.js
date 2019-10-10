import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import toastMiddleware from './middleware/toastMiddleware';

const store = createStore(rootReducer, applyMiddleware(thunk, toastMiddleware));


export default store;
