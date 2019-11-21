import { keysToCamel, keysToUnderscore } from '../api';
import { API } from '../index';
import { loadOwnTimetable } from './currentStatus';

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'USER_LOADING' });
    API.get('/api/auth/user/')
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch({ type: 'USER_LOADED', data: keysToCamel(data) });
          dispatch(loadOwnTimetable());
        } else if (status >= 400) {
          dispatch({ type: 'LOAD_ERROR', data: keysToCamel(data) });
        }
      }).catch(reason => dispatch({ type: 'LOAD_ERROR', data: { exception: reason } }));
  };
};

export const login = (email, password) => {
  return (dispatch, getState) => {
    return API.post('/api/auth/login/', { email, password })
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch({ type: 'LOGIN_SUCCESSFUL', data: keysToCamel(data) });
          dispatch(loadOwnTimetable());
        } else {
          dispatch({ type: 'LOGIN_FAILED', data: keysToCamel(data) });
        }
      }).catch(reason => dispatch({ type: 'LOGIN_FAILED', data: { exception: reason } }));
  };
};

export const register = (email, password, confirmPassword, firstName, lastName) => {
  return (dispatch, getState) => {
    API.post('/api/auth/register/', keysToUnderscore({ email, password, confirmPassword, firstName, lastName }))
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch({ type: 'REGISTRATION_SUCCESSFUL', data: keysToCamel(data) });
        } else if (status === 401 || status === 403) {
          dispatch({ type: 'AUTHENTICATION_ERROR', data: keysToCamel(data) });
        } else {
          dispatch({ type: 'REGISTRATION_FAILED', data: keysToCamel(data) });
        }
      }).catch(reason => dispatch({ type: 'REGISTRATION_FAILED', data: { exception: reason } }));
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    API.post('/api/auth/logout/')
      .then(({ status, data }) => {
        if (status === 204) {
          dispatch({ type: 'LOGOUT_SUCCESSFUL' });
        } else if (status === 403 || status === 401) {
          dispatch({ type: 'AUTHENTICATION_ERROR', data: keysToCamel(data) });
        }
      }).catch(reason => dispatch({ type: 'AUTHENTICATION_ERROR', data: { exception: reason } }));
  };
};

export const clearErrors = () => ({ type: 'CLEAR_ERRORS' });
