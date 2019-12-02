import { keysToCamel } from '../api';
import { API, deepGet } from '../index';

export const loadSections = () => {
  return (dispatch, getState) => {
    const length = deepGet(getState(), 'staticTables.sections.length', 0);
    if (length > 0) return;
    dispatch({ type: 'STATIC_SECTIONS_LOADING' });
    API.get('/api/sections/')
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'STATIC_SECTIONS_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'STATIC_SECTIONS_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const loadStaticTableHierarchy = (sectionId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'STATIC_TABLE_HIERARCHY_LOADING' });
    API.get(`/api/static-tables-hierarchy/?section_id=${ sectionId }`)
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'STATIC_TABLE_HIERARCHY_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'STATIC_TABLE_HIERARCHY_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const loadStaticTable = (searchId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'STATIC_TABLE_LOADING' });
    API.get(`/api/static-tables/?search_id=${ searchId }`)
      .then(({ status, data }) => {
        if (status === 200)
          dispatch({ type: 'STATIC_TABLE_LOADED', data: keysToCamel(data) });
        else {
          dispatch({ type: 'STATIC_TABLE_ERROR', data: keysToCamel(data) });
        }
      });
  };
};
