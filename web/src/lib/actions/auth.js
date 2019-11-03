import { API } from '../index';

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: 'USER_LOADING'});
    API.get('/api/auth/user/')
      .then(({status, data}) => {
        if (status === 200)
          dispatch({type: 'USER_LOADED', user: data});
        else if (status >= 400) {
          dispatch({type: 'LOAD_ERROR', data});
        }
      });
  };
};

export const login = (email, password) => {
  return (dispatch, getState) => {
    return API.post('/api/auth/login/', {email, password})
      .then(({data, status}) => {
        if (status === 200) {
          dispatch({type: 'LOGIN_SUCCESSFUL', data});
        } else {
          dispatch({type: 'LOGIN_FAILED', data});
        }
      });
  };
};

export const register = (email, password, confirm_password, first_name, last_name) => {
  return (dispatch, getState) => {
    API.post('/api/auth/register/', {email, password, confirm_password, first_name, last_name})
      .then(({status, data}) => {
        if (status === 200) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data});
        } else if (status === 401 || status === 403) {
          dispatch({type: 'AUTHENTICATION_ERROR', data});
        } else {
          dispatch({type: 'REGISTRATION_FAILED', data});
        }
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    API.post('/api/auth/logout/')
      .then(({status, data}) => {
        if (status === 204) {
          dispatch({type: 'LOGOUT_SUCCESSFUL'});
        } else if (status === 403 || status === 401) {
          dispatch({type: 'AUTHENTICATION_ERROR', data: data});
        }
      });
  };
};
