import { keysToCamel } from '../api';
import { API } from '../index';

export const loadCurrentWeek = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'CURRENT_WEEK_STATUS_LOADING' });
    API.get('/api/current-week/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'CURRENT_WEEK_STATUS_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'CURRENT_WEEK_STATUS_ERROR', data: null });
        }
      });
  };
};
