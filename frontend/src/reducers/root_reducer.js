import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors';

const RootReducer = combineReducers({
  session,
  errors
});

export default RootReducer;