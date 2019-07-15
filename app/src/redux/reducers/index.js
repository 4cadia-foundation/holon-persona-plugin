import { combineReducers } from 'redux';

import validations from './validations';
import persona from './persona';
import navigation from './navigation';

export default combineReducers({
    validations,
    persona,
    navigation
});