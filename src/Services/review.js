import axios from 'axios';

const Base_URL = `${process.env.REACT_APP_SERVER}/review`;

export function callAddReview(action) {
  return axios.post(`${Base_URL}/write`, action.payload);
}

export function callGetReview(action) {
  return axios.post(`${Base_URL}/getReview`, { venueId: action.payload });
}
