import { keysToCamel, keysToUnderscore } from '../api';
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
    dispatch(loadCustomData());
  };
};

export const loadCustomData = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'PERSONAL_TIMETABLE_ENTRIES_LOADING' });
    API.get('/api/personal-timetable-entries/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'PERSONAL_TIMETABLE_ENTRIES_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'PERSONAL_TIMETABLE_ENTRIES_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const addCustomEntry = (entry) => {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_PERSONAL_TIMETABLE_ENTRY_LOADING' });
    API.post('/api/personal-timetable-entries/', keysToUnderscore(entry))
      .then(({ status, data }) => {
        if (status >= 200 && status < 300)
          dispatch({ type: 'ADD_PERSONAL_TIMETABLE_ENTRY_LOADED' });
        else {
          dispatch({ type: 'ADD_PERSONAL_TIMETABLE_ENTRY_ERROR', data: keysToCamel(data) });
        }
        dispatch(loadCustomData());
      });
  };
};

export const removeCustomEntry = (entryId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_PERSONAL_TIMETABLE_ENTRY_LOADING' });
    API.delete(`/api/personal-timetable-entries/${ entryId }/`)
      .then(({ status, data }) => {
        if (status >= 200 && status < 300)
          dispatch({ type: 'REMOVE_PERSONAL_TIMETABLE_ENTRY_LOADED' });
        else {
          dispatch({ type: 'REMOVE_PERSONAL_TIMETABLE_ENTRY_ERROR', data: keysToCamel(data) });
        }
        dispatch(loadCustomData());
      });
  };
};
