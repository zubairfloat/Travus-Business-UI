import * as type from '../../Types/venue';

const initState = {
    status : {
        isloading: false,
        isLoaded: true,
    },
    venues: [],
    DetailsVenues: [],
    business: []
}

const savedVenueReducer = (state = initState, action) => {
    switch (action.type) {
        case "VENUES_UPDATE_USER_SUCCESS":
            return {
                ...state,
                DetailsVenues: action.venues
            }
        case "USER_SIGN_IN_SUCCESS":
            return {
                ...state,
                venues: action.venues
            }
        case type.SAVE_VENUE:
            return {
                ...state,
                status: { isloading: true, isLoaded: false}
            }
        case type.REMOVE_VENUE_SUCCESS:
            return { 
                ...state, 
                status: { isloading: false, isLoaded: true },
                venues: action.payload
            }
        case type.SAVE_VENUE_SUCCESS:            
            return { 
                ...state, 
                status: { isloading: false, isLoaded: true },
                venues: action.payload
            }
        case type.REMOVE_VENUE:
            return { 
                ...state, 
                status: { isloading: true, isLoaded: false },
            }
        case type.REMOVE_VENUE_FAILURE:
        case type.SAVE_VENUE_FAILURE:
            return {
                ...state,
                status: { isloading: false, isLoaded: true },
            }
        default:
            return state;
    }
}

export default savedVenueReducer;