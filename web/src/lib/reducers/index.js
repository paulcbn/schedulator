import { combineReducers } from 'redux';
import auth from './auth';
import initialSetup from './initialSetup';
import currentStatus from './currentStatus';
import staticTables from './staticTables';

const rootReducer = combineReducers({
  auth, initialSetup, currentStatus, staticTables,
});

export default rootReducer;
