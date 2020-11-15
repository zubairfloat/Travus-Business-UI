import axios from 'axios';

const Base_URL = `${process.env.REACT_APP_SERVER}/user`;

export function callUpdate(action) {
  return axios.post(`${Base_URL}/update`, action.payload);
}
export function callSignUp(action) {
  return axios.post(`${Base_URL}/signup`, action.payload);
}
export function callSignin(action) {
  return axios.post(`${Base_URL}/signin`, action.payload);
}
export function callVerify(action) {
  return axios.post(`${Base_URL}/verify`, { token: action.payload });
}
export function callForGet(action) {
  return axios.post(`${Base_URL}/forget`, { email: action.payload });
}
export function callReset(action) {
  return axios.post(`${Base_URL}/reset`, action.payload );
}
