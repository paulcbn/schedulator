import { keysToCamel } from '../api';
import { API } from '../index';

export const loadOwnTimetable = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'OWN_TIMETABLE_LOADING' });
    API.get('/api/attendances/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'OWN_TIMETABLE_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'OWN_TIMETABLE_ERROR', data: keysToCamel(data) });
        }
      });
  };
};
