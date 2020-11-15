import * as types from '../../Types/auth';

const initState = {
  isAuthenticated: false,
  update: false,
  user: {},
  loading: false,
  transparent: true,
  register: false,
  isverify: true,
  resetPassword: false,
  forgot: false
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_SUCCESS:
      state = {
        ...state,
        isAuthenticated: true,
        user: action.auth.user,
        update: true,
        loading: false,
      };
      break;
    case types.UPDATE_USER:
      state = {
        ...state,
        loading: true,
        update: false,
      };
      break;
    case types.USER_REGISTRATION_SUCCESS:
      state = {
        ...state,
        isAuthenticated: false,
        user: action.auth,
        loading: false,
        register: true,
        isverify: false,
      };
      break;
    case types.USER_SIGN_IN:
      state = {
        ...state,
        loading: true
      };
      break;
    case types.USER_FOR_GET_PASSWORD:
      state = {
        ...state,
        loading: true,
        forgot: false
      };
      break;
      case types.USER_FOR_GET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        forgot: true
      };
      break;
    case types.USER_REGISTRATION:
      state = {
        ...state,
        loading: true,
        register: false,
      };
      break;
    case types.USER_LOGIN_FALSE:
      state = {
        ...state,
        loading: false,
        update: false
      };
      break;
    case types.USER_VERIFY_TOKEN_SUCCESS:
      state = {
        ...state,
        isverify: true
      };
      break;
    case types.USER_SIGN_IN_SUCCESS:
      state = {
        ...state,
        isAuthenticated: true,
        user: action.auth.user,
        token: action.token,
        loading: false
      };
      break;
    case types.USER_RESET_PASSWORD:
      state = {
        ...state,
        loading: true,
        resetPassword: false,
      };
      break;
    case types.USER_RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        resetPassword: true,
      };
      break;
    case types.LOGOUT_SUCCESS:
      state = {
        ...state,
        isAuthenticated: false,
        user: {},
      };
      break;
    case types.USER_PIC_UPLOAD_SUCCESS:
      state = {
        ...state,
        isAuthenticated: true,
        user: action.auth.user,
        token: action.token
      };
      break;
    case types.SET_TRANSPARENT:
      state = {
        ...state,
        transparent: action.payload,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default authReducer;
