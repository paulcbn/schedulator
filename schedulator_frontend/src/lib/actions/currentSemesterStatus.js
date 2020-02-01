import { keysToCamel } from '../api';
import { API } from '../index';

export const loadCurrentSemesterStatus = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'CURRENT_SEMESTER_STATUS_LOADING' });
    API.get('/api/current-semester-status/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'CURRENT_SEMESTER_STATUS_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'CURRENT_SEMESTER_STATUS_ERROR', data: null });
        }
      });
  };
};
