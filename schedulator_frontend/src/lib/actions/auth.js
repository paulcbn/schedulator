import { keysToCamel } from '../api';
import { API } from '../index';
import { loadOwnData } from './currentTimetable';

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'CURRENT_USER_LOADING' });
    API.get('/api/auth/user/')
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch({ type: 'CURRENT_USER_LOADED', data: keysToCamel(data) });
          dispatch({ type: 'CLEAR_AUTH_ERRORS' });
          dispatch(loadOwnData());
        } else if (status >= 400 && status < 500) {
          dispatch({ type: 'CURRENT_USER_ERROR', data: keysToCamel(data) });
        }
      });
  };
};

export const login = (username, password, captcha) => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOGIN_LOADING' });
    return API.post('/api/auth/login/', { username, password, captcha })
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch({ type: 'LOGIN_LOADED', data: keysToCamel(data) });
          dispatch({ type: 'CLEAR_AUTH_ERRORS' });
          dispatch(loadUser());
          dispatch(loadOwnData());
        } else {
          dispatch({ type: 'LOGIN_ERROR', data: keysToCamel(data) });
        }
      }).catch(reason => dispatch({ type: 'LOGIN_ERROR', data: { exception: reason } }));
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    await API.post('/api/auth/logout/');
    dispatch({ type: 'LOGOUT_LOADED' });
    dispatch({ type: 'CLEAR_AUTH_ERRORS' });
  };
};
