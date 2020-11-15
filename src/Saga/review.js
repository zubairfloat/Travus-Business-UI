import * as types from '../Types/review';
import { takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as Services from '../Services/review';

function* addReviewSaga(action) {
  try {
    const response = yield call(Services.callAddReview, action);
    if (response.status === 200) {
      toast.info('Review Added Successfully');
      yield put({
        type: types.ADD_REVIEW_SUCCESS,
        reviews: response.data.details
      })
    }
    else {
      yield put({
        type: types.ADD_REVIEW_FAIL,
      })
    }
  } catch (error) {
    yield put({
      type: types.ADD_REVIEW_FAIL,
    })
    console.log(error);
  }
}

function* getReviewSaga(action) {
  try {
    const response = yield call(Services.callGetReview, action);
    if (response.status === 200) {
      yield put({
        type: types.GET_REVIEW_SUCCESS,
        reviews: response.data.data,
        rating: response.data.avgRatting
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* reviewWatcher() {
  yield takeLatest(types.ADD_REVIEW, addReviewSaga);
  yield takeLatest(types.GET_REVIEW, getReviewSaga);
}
