import { combineReducers } from 'redux';
import auth from './auth';
import currentTimetable from './currentTimetable';
import enrollmentStatus from './enrollmentStatus';
import resetTimetable from './resetTimetable';
import staticTables from './staticTables';
import currentWeek from './currentWeek';

const rootReducer = combineReducers({
  auth, resetTimetable, currentTimetable, staticTables, enrollmentStatus, currentWeek,
});

export default rootReducer;
