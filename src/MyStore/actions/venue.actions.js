import * as types from '../../Types/venue';

export const saveVenue = (payload) => {
    return {
        type: types.SAVE_VENUE,
        payload
    }
}

export const removeVenue = (payload) => {
    return {
        type: types.REMOVE_VENUE,
        payload
    }
}
