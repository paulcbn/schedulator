import { keysToCamel, keysToUnderscore } from '../api';
import { API, deepGet } from '../index';
import { loadOwnData } from './currentStatus';

export const loadEnrollmentState = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'CURRENT_ENROLLMENT_STATE_LOADING' });
    API.get('/api/enrollments-state/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'CURRENT_ENROLLMENT_STATE_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'CURRENT_ENROLLMENT_STATE_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const loadSubjectComponentState = (subjectComponentId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SUBJECT_COMPONENT_STATE_LOADING' });
    API.get(`/api/subject-components/${subjectComponentId}/attendances/`)
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'SUBJECT_COMPONENT_STATE_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'SUBJECT_COMPONENT_STATE_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const addEntriesToSelf = (entryIds) => {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_ENTRIES_LOADING' });
    const componentId = deepGet(getState(), 'enrollmentStatus.subjectComponentState.subjectComponent.id');
    API.post('/api/attendances/', { entry_ids: entryIds })
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'ADD_ENTRIES_LOADED' });
        else {
          dispatch({ type: 'ADD_ENTRIES_ERROR', data: keysToCamel(data) });
        }
        dispatch(loadEnrollmentState());
        if (componentId !== undefined)
          dispatch(loadSubjectComponentState(componentId));
        dispatch(loadOwnData());
      });
  };
};

export const removeEntryForSelf = (entryId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_ENTRY_LOADING' });
    const componentId = deepGet(getState(), 'enrollmentStatus.subjectComponentState.subjectComponent.id');
    API.delete('/api/attendances/', { params: { entry_id: entryId } })
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'REMOVE_ENTRY_LOADED' });
        else {
          dispatch({ type: 'REMOVE_ENTRY_ERROR', data: keysToCamel(data) });
        }
        dispatch(loadEnrollmentState());
        if (componentId !== undefined)
          dispatch(loadSubjectComponentState(componentId));
        dispatch(loadOwnData());
      });
  };
};

export const removeEnrollmentForSelf = (subjectId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_ENROLLMENT_LOADING' });
    API.delete('/api/enrollments/', { params: { subject_id: subjectId } })
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'REMOVE_ENROLLMENT_LOADED' });
        else {
          dispatch({ type: 'REMOVE_ENROLLMENT_ERROR', data: keysToCamel(data) });
        }
        dispatch(loadEnrollmentState());
        dispatch(loadOwnData());
      });
  };
};

export const clearComponentState = () => ({ type: 'SUBJECT_COMPONENT_STATE_CLEAR' });


export const loadSubjectSearchResult = (searchString, pageIndex = 1) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SUBJECT_SEARCH_RESULT_LOADING', data: searchString });
    API.get(`/api/not-owned-subjects/?search_string=${searchString}&page=${+pageIndex}`)
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'SUBJECT_SEARCH_RESULT_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'SUBJECT_SEARCH_RESULT_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const addEnrollmentToSelf = (subjectId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_ENROLLMENT_LOADING' });
    const pageIndex = deepGet(getState(), 'enrollmentStatus.subjectSearchResult.currentPage', 1);
    const searchString = deepGet(getState(), 'enrollmentStatus.subjectSearchString', '');
    API.post('/api/enrollments/', keysToUnderscore({ subjectId }))
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'ADD_ENROLLMENT_LOADED' });
        else {
          dispatch({ type: 'ADD_ENROLLMENT_ERROR', data: keysToCamel(data) });
        }
        dispatch(loadSubjectSearchResult(searchString, pageIndex));
        dispatch(loadEnrollmentState());
      });
  };
};


export const clearSubjectSearchResult = () => ({ type: 'SUBJECT_SEARCH_RESULT_CLEAR' });
