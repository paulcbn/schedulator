import { combineReducers } from 'redux';
import auth from './auth';
import currentTimetable from './currentTimetable';
import enrollmentStatus from './enrollmentStatus';
import resetTimetable from './resetTimetable';
import staticTimetables from './staticTimetables';
import currentSemesterStatus from './currentSemesterStatus';

const rootReducer = combineReducers({
  auth, resetTimetable, currentTimetable, staticTimetables, enrollmentStatus, currentSemesterStatus,
});

export default rootReducer;
