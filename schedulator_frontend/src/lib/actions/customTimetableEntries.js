import { keysToCamel, keysToUnderscore } from '../api';
import { API } from '../index';

export const loadCustomData = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'CUSTOM_TIMETABLE_ENTRIES_LOADING' });
    API.get('/api/custom-timetable-entries/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'CUSTOM_TIMETABLE_ENTRIES_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'CUSTOM_TIMETABLE_ENTRIES_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const addCustomEntry = (entry) => {
  return (dispatch, getState) => {
    dispatch({ type: 'CUSTOM_TIMETABLE_ENTRIES_ADD_LOADING' });
    API.post('/api/custom-timetable-entries/', keysToUnderscore(entry))
      .then(({ status, data }) => {
        if (status >= 200 && status < 300)
          dispatch({ type: 'CUSTOM_TIMETABLE_ENTRIES_ADD_LOADED' });
        else {
          dispatch({ type: 'CUSTOM_TIMETABLE_ENTRIES_ADD_ERROR', data: keysToCamel(data) });
        }
        dispatch(loadCustomData());
      });
  };
};

export const removeCustomEntry = (entryId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'CUSTOM_PERSONAL_TIMETABLE_ENTRIES_REMOVE_LOADING' });
    API.delete(`/api/custom-timetable-entries/${ entryId }/`)
      .then(({ status, data }) => {
        if (status >= 200 && status < 300)
          dispatch({ type: 'CUSTOM_PERSONAL_TIMETABLE_ENTRIES_REMOVE_LOADED' });
        else {
          dispatch({ type: 'CUSTOM_PERSONAL_TIMETABLE_ENTRIES_REMOVE_ERROR', data: keysToCamel(data) });
        }
        dispatch(loadCustomData());
      });
  };
};
