import * as types from '../Types/trip';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as tripService from '../Services/trip';
import { toast } from 'react-toastify';

function* saveTrip(action) {
    try {
        let { payload } = action;
        let response = yield call(tripService.saveTrip, payload)
        if(response.status === 201){
            toast.info("Successfully added")
            yield put({type: types.SAVE_TRIP_SUCCESS, payload: response.data.trip })
        }
    } catch (error) {
        if (error.message === "Request failed with status code 401") {
            toast.error("There were some error")
        }
        yield put({type: types.SAVE_TRIP_FAILURE})
    }
}

function* venuesUpdate(action) {
    try {
        let user = action.payload;
        let response = yield call(tripService.venuesUpdate, user)
        yield put({
            type: types.VENUES_UPDATE_USER_SUCCESS,
            venues: response.data?.savedVenues?.venues || []
          });
        // if(response.status === 201){
        //     toast.info("Successfully added")
        //     yield put({type: types.SAVE_TRIP_SUCCESS, payload: response.data.trip })
        // }
    } catch (error) {
        // if (error.message === "Request failed with status code 401") {
        //     toast.error("There were some error")
        // }
        // console.log("ERR: SAVE TRIP: ", error.message);
        // yield put({type: types.SAVE_TRIP_FAILURE})
    }
}

export default function* watchTrip() {
    yield takeLatest(types.SAVE_TRIP, saveTrip);
    yield takeLatest(types.VENUES_UPDATE_USER , venuesUpdate)
}
  