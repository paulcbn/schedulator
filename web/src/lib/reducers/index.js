import { combineReducers } from 'redux';
import auth from './auth';
import currentStatus from './currentStatus';
import enrollmentStatus from './enrollmentStatus';
import initialSetup from './initialSetup';
import staticTables from './staticTables';
import currentWeek from './currentWeek';

const rootReducer = combineReducers({
  auth, initialSetup, currentStatus, staticTables, enrollmentStatus, currentWeek,
});

export default rootReducer;
