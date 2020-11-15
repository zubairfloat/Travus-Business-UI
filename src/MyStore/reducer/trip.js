import * as types from '../../Types/trip';

const initState = {
    status: {isLoading:false, isLoaded: true},
    date: undefined,
    location: {},
    activities: []
}

const tripReducer = (state = initState, action) => {
    switch(action.type) {
        case types.UPDATE_TRIP_DATE:
            return {
                ...state,
                date: action.payload
            }
        case types.UPDATE_TRIP_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        default:
            return state
    }
}

export default tripReducer;