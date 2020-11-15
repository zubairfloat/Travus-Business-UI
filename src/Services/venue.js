import axios from 'axios';

const Base_URL = `${process.env.REACT_APP_SERVER}/venue`;

export function seveVenue(userId, venueId) {
  return axios.post(`${Base_URL}`, {venueId, userId});
}

export function businessDetails(action) {
  return axios.post(`${Base_URL}/business`, { _id: action.payload});
}

export function removeVenue(userId, venueId) {
  return axios.post(`${Base_URL}/remove`, {userId, venueId});
}