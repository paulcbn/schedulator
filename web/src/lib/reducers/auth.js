import { removeToken, setToken } from '../api';

const initialState = {
  token: localStorage.getItem('token'),
  currentUser: null,
  isAuthenticated: false,

  loginLoading: false,
  loginErrors: {},

  registerLoading: false,
  registerErrors: {},

  currentUserLoading: false,
  currentUserErrors: {},
};


export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_USER_LOADING':
      return {
        ...state,
        currentUser: null,
        currentUserLoading: true,
        currentUserErrors: {},
        isAuthenticated: false,
      };
    case 'CURRENT_USER_ERROR':
      removeToken();
      return {
        ...state,
        currentUser: null,
        currentUserLoading: false,
        currentUserErrors: action.data,
        isAuthenticated: false,
      };
    case 'CURRENT_USER_LOADED':
      return {
        ...state,
        currentUser: action.data,
        currentUserLoading: false,
        currentUserErrors: {},
        isAuthenticated: true,
      };

    case 'LOGIN_LOADING':
      removeToken();
      return {
        ...state,
        currentUser: null,
        token: null,
        loginLoading: true,
        loginErrors: {},
        isAuthenticated: false,
      };
    case 'LOGIN_ERROR':
      removeToken();
      return {
        ...state,
        currentUser: null,
        token: null,
        loginLoading: false,
        loginErrors: action.data,
        isAuthenticated: false,
      };
    case 'LOGIN_LOADED':
      setToken(action.data.token);
      return {
        ...state,
        currentUser: action.data.user,
        token: action.data.token,
        loginLoading: false,
        loginErrors: {},
        isAuthenticated: true,
      };

    case 'REGISTER_LOADING':
      removeToken();
      return {
        ...state,
        currentUser: null,
        token: null,
        registerLoading: true,
        registerErrors: {},
        isAuthenticated: false,
      };
    case 'REGISTER_ERROR':
      removeToken();
      return {
        ...state,
        currentUser: null,
        token: null,
        registerLoading: false,
        registerErrors: action.data,
        isAuthenticated: false,
      };
    case 'REGISTER_LOADED':
      setToken(action.data.token);
      return {
        ...state,
        currentUser: action.data.user,
        token: action.data.token,
        registerLoading: false,
        registerErrors: {},
        isAuthenticated: true,
      };

    case 'LOGOUT_LOADED':
      removeToken();
      return {
        ...state,
        currentUser: null,
        token: null,
        isAuthenticated: false,
      };

    case 'CLEAR_AUTH_ERRORS':
      return { ...state, loginErrors: {}, registerErrors: {}, currentUserErrors: {} };
    //
    // case 'USER_LOADING':
    //   return { ...state, isLoading: true, errors: {} };
    //
    // case 'USER_LOADED':
    //   return { ...state, isAuthenticated: true, isLoading: false, user: action.data };
    //
    // case 'LOGIN_SUCCESSFUL':
    // case 'REGISTRATION_SUCCESSFUL':
    //   setToken(action.data.token);
    //   return { ...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null };
    // case 'LOGOUT_SUCCESSFUL':
    // case 'LOGIN_FAILED':
    // case 'LOAD_ERROR':
    // case 'REGISTRATION_FAILED':
    //   removeToken();
    //   return {
    //     ...state, errors: action.data, token: null, user: null,
    //     isAuthenticated: false, isLoading: false,
    //   };

    default:
      return state;
  }
}
