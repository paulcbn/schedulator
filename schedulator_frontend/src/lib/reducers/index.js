import { combineReducers } from 'redux';
import auth from './auth';
import currentTimetable from './currentTimetable';
import enrollmentStatus from './enrollmentStatus';
import resetTimetable from './resetTimetable';
import staticTables from './staticTables';
import currentSemesterStatus from './currentSemesterStatus';

const rootReducer = combineReducers({
  auth, resetTimetable, currentTimetable, staticTables, enrollmentStatus, currentSemesterStatus,
});

export default rootReducer;
