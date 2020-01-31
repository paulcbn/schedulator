import { combineReducers } from 'redux';
import auth from './auth';
import currentStatus from './currentStatus';
import enrollmentStatus from './enrollmentStatus';
import resetTimetable from './resetTimetable';
import staticTables from './staticTables';
import currentWeek from './currentWeek';

const rootReducer = combineReducers({
  auth, resetTimetable, currentStatus, staticTables, enrollmentStatus, currentWeek,
});

export default rootReducer;
