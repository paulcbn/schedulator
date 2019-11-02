const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},
};


export default function auth(state = initialState, action) {
  console.log({action});
  switch (action.type) {
    case 'USER_LOADING':
      return {...state, isLoading: true};

    case 'USER_LOADED':
      return {...state, isAuthenticated: true, isLoading: false, user: action.user};

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};
    case 'LOGOUT_SUCCESSFUL':
    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
      localStorage.removeItem("token");
      return {
        ...state, errors: action.data, token: null, user: null,
        isAuthenticated: false, isLoading: false
      };

    default:
      return state;
  }
}