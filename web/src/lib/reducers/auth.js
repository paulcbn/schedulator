import { API } from '../index';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},
};


export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };

    case 'USER_LOADING':
      return { ...state, isLoading: true };

    case 'USER_LOADED':
      return { ...state, isAuthenticated: true, isLoading: false, user: action.data };

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem('token', action.data.token);
      API.defaults.headers.common['Authorization'] = `Token ${ action.data.token }`;
      return { ...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null };
    case 'LOGOUT_SUCCESSFUL':
    case 'LOGIN_FAILED':
    case 'LOAD_ERROR':
    case 'REGISTRATION_FAILED':
      localStorage.removeItem('token');
      delete API.defaults.headers.common['Authorization'];
      return {
        ...state, errors: action.data, token: null, user: null,
        isAuthenticated: false, isLoading: false,
      };

    default:
      return state;
  }
}
