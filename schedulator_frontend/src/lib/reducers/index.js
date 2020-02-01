import { combineReducers } from 'redux';
import auth from './auth';
import currentTimetable from './currentTimetable';
import enrollmentManager from './enrollmentManager';
import resetTimetable from './resetTimetable';
import staticTimetables from './staticTimetables';
import currentSemesterStatus from './currentSemesterStatus';

const rootReducer = combineReducers({
  auth, resetTimetable, currentTimetable, staticTimetables, enrollmentManager, currentSemesterStatus,
});

export default rootReducer;
