import { combineReducers } from 'redux';
import auth from './auth';
import initialSetup from './initialSetup';
import currentStatus from './currentStatus';

const rootReducer = combineReducers({
  auth, initialSetup, currentStatus,
});

export default rootReducer;
