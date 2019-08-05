import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

import thunk from 'redux-thunk';
import toastMiddleware from './middleware/toastMiddleware';

const store = createStore(rootReducer, applyMiddleware(thunk, toastMiddleware));


export default store;
