import { keysToCamel } from '../api';
import { API } from '../index';
import { loadCustomData } from './customTimetableEntries';

export const loadOwnData = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'OWN_TIMETABLE_LOADING' });
    API.get('/api/current-timetable/attendances/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'OWN_TIMETABLE_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'OWN_TIMETABLE_ERROR', data: keysToCamel(data) });
        }
      });
    dispatch(loadCustomData());
  };
};

