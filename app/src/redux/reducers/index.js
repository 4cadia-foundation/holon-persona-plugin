import { combineReducers } from 'redux';

import validations from './validations';
import persona from "./persona";

export default combineReducers({
    validations,
    persona
});