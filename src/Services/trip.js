import axios from 'axios';

const Base_URL = `${process.env.REACT_APP_SERVER}/trip`;

export const saveTrip = payload => {  
    return axios.post(`${Base_URL}/add`, payload)
}

export const venuesUpdate = user => {
    return axios.post(`${Base_URL}/venues`, {userId: user})
}