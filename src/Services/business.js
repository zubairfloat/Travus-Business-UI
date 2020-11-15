import axios from 'axios';

const Base_URL = `${process.env.REACT_APP_SERVER}/business`;

export function callAddBusiness(action) {
  return axios.post(`${Base_URL}/add`, action.payload);
}
export function callGetBusiness(action) {
  return axios.post(`${Base_URL}`, action.payload);
}
export function callGetAllBusiness(action) {
  return axios.post(`${Base_URL}/all`, action.payload);
}
export function callSearchBusiness(action) {
  return axios.post(`${Base_URL}/allList`, { businessName: action.payload });
}
export function callexploreSearch(action) {
  return axios.get(`${Base_URL}/venueName`, { params: { search: action.payload } });
}
export function callUpdateBusiness(action) {
  return axios.post(`${Base_URL}/update`, action.payload);
}
export function callDataSaveDb(imgArray) {
  return axios.post(`${Base_URL}/api`, imgArray);
}
export function callVenueBusiness(action) {
  return axios.post(`${Base_URL}/city`, action.payload );
}
export function callForSquareAPI(action) {
  return axios.post(`${Base_URL}/callForSquare`, action.payload );
}
export function callVenuesUpdate(action) {
  return axios.get(`${Base_URL}/updateViews`,{ params: { _id: action.payload } });
}
export function callTrendingData() {
  return axios.get(`${Base_URL}/trending`);
}
export function callNearData(action) {
  return axios.post(`${Base_URL}/near`, action.payload );
}
