import { keysToCamel } from '../api';
import { API, deepGet } from '../index';

export const loadSections = () => {
  return (dispatch, getState) => {
    const length = deepGet(getState(), 'staticTimetables.sections.length', 0);
    if (length > 0) return;
    dispatch({ type: 'STATIC_TIMETABLES_SECTIONS_LOADING' });
    API.get('/api/static-timetables/sections/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'STATIC_TIMETABLES_SECTIONS_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'STATIC_TIMETABLES_SECTIONS_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const loadStaticTimetableHierarchy = (sectionId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'STATIC_TIMETABLE_HIERARCHY_LOADING' });
    API.get(`/api/static-timetables/formation-static-timetables-hierarchy/?section_id=${sectionId}`)
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'STATIC_TIMETABLE_HIERARCHY_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'STATIC_TIMETABLE_HIERARCHY_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const loadStaticTimetable = (searchId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'STATIC_TIMETABLE_LOADING' });
    API.get(`/api/static-timetables/?search_id=${searchId}`)
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'STATIC_TIMETABLE_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'STATIC_TIMETABLE_ERROR', data: keysToCamel(data) });
        }
      });
  };
};


export const loadSubjectSearchResult = (searchString, pageIndex = 1) => {
  return (dispatch, getState) => {
    dispatch({ type: 'STATIC_TIMETABLE_SUBJECT_SEARCH_RESULT_LOADING', data: searchString });
    API.get(`/api/static-timetables/subject-static-timetables/?search_string=${searchString}&page=${+pageIndex}`)
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'STATIC_TIMETABLE_SUBJECT_SEARCH_RESULT_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'STATIC_TIMETABLE_SUBJECT_SEARCH_RESULT_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const clearSubjectSearchResult = () => ({ type: 'STATIC_TIMETABLE_SUBJECT_SEARCH_RESULT_CLEAR' });


export const loadTeacherSearchResult = (searchString, pageIndex = 1) => {
  return (dispatch, getState) => {
    dispatch({ type: 'STATIC_TIMETABLE_TEACHER_SEARCH_RESULT_LOADING', data: searchString });
    API.get(`/api/static-timetables/teacher-static-timetables/?search_string=${searchString}&page=${+pageIndex}`)
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'STATIC_TIMETABLE_TEACHER_SEARCH_RESULT_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'STATIC_TIMETABLE_TEACHER_SEARCH_RESULT_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const clearTeacherSearchResult = () => ({ type: 'STATIC_TIMETABLE_TEACHER_SEARCH_RESULT_CLEAR' });
