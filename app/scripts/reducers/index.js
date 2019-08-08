import { combineReducers } from 'redux';

import validations from './validations';
import persona from './persona';
import navigation from './navigation';
import wallet from './wallet';
import example from './example';

export default combineReducers({
  validations,
  persona,
  navigation,
  wallet,
  example
});
