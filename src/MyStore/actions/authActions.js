import * as types from '../../Types/auth';

export function Signup(user) {
  return {
    type: types.USER_REGISTRATION,
    payload: user
  };
}
export function updateUser(userUpdate) {
  return {
    type: types.UPDATE_USER,
    payload: userUpdate
  };
}
export function SignIn(SignInuser) {
  return {
    type: types.USER_SIGN_IN,
    payload: SignInuser
  };
}
export function TokenCode(token) {
  return {
    type: types.USER_VERIFY_TOKEN,
    payload: token
  };
}
export function resetPassword(reset) {
  return {
    type: types.USER_RESET_PASSWORD,
    payload: reset
  };
}
export function forGet(email) {
  return {
    type: types.USER_FOR_GET_PASSWORD,
    payload: email
  };
}
export function addImage(formData) {
  return {
    type: types.USER_PIC_UPLOAD,
    payload: formData
  };
}
export function logout(user) {
  return {
    type: types.LOGOUT,
    payload: user
  };
}
export function setTransparent(payload) {
  return {
    type: types.SET_TRANSPARENT,
    payload: payload

  };
}
