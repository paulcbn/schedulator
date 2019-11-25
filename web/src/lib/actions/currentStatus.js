import { keysToCamel } from '../api';
import { API } from '../index';

export const loadOwnData = () => {
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
    API.get('/api/current-week/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'SET_CURRENT_WEEK', data: keysToCamel(data) });
        else {
          dispatch({ type: 'SET_CURRENT_WEEK', data: null });
        }
      });
  };
};
