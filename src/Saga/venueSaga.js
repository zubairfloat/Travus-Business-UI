import * as types from '../Types/venue';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as venueSelector from '../Selectors/venue.selector';
import * as authSelector from '../Selectors/auth';
import * as services from '../Services/venue';

function* savedVenue(action) {
    try {
        const userId = yield select(authSelector.selectID)
        if (!userId) {
            toast.error("Sign in required");
            throw new Error("try again");
        }
        const getSavedVenues = yield select(venueSelector.getVenues);
        getSavedVenues.filter(venue => {if(venue === action.payload){
            toast.info("Already saved!");
            throw("Already saved!")
        }});
        const response = yield call(services.seveVenue, userId, action.payload)
        if (response.status === 201) {
            toast.success("Saved");
            yield put({
                type: types.SAVE_VENUE_SUCCESS,
                payload: response.data.message
            })
        }else {
            throw("TRY AGAIN")
        }
    } catch (error) {
        console.log("ERROR SAVED VENUE SAGA: ", error);
        yield put({type: types.SAVE_VENUE_FAILURE})
    }
}

function* removeVenue(action) {
    try {
        const userId = yield select(authSelector.selectID)
        if (!userId) {
            toast.error("Sign in required");
            throw new Error("try again");
        }
        const response = yield call(services.removeVenue, userId, action.payload)
        if (response.status === 201) {
            toast.info("Unsaved");
            yield put({
                type: types.REMOVE_VENUE_SUCCESS,
                payload: response.data.message
            })
        }else {
            throw("TRY AGAIN")
        }

    } catch (error) {
        console.log("ERROR SAVED VENUE SAGA: ", error);
        yield put({type: types.SAVE_VENUE_FAILURE, error})

    }
}

export default function* reviewWatcher() {
    yield takeLatest(types.SAVE_VENUE, savedVenue);
    yield takeLatest(types.REMOVE_VENUE, removeVenue);
  }
