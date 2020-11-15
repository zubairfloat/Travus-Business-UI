import * as types from '../../Types/trip';

export const updateTripDate = (date) => {
    return {
        type: types.UPDATE_TRIP_DATE,
        payload: date
    }
}

export const updateTripLocation = (location) => {
    return {
        type: types.UPDATE_TRIP_LOCATION,
        payload: location
    }
}

export const clearTrip = (payload) => {
    return {
        type: types.CLEAR_TRIP,
        payload
    }
}

export const saveTrip = payload => {
    return {
        type: types.SAVE_TRIP,
        payload
    }
}
export const updateUser = user => {
    return {
        type: types.VENUES_UPDATE_USER,
        payload: user
    }
}