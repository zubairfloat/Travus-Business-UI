import * as types from '../Types/auth';
import * as Services from '../Services/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as businessNormalize from '../Normalizr/unique.BS';
import { toast } from 'react-toastify';

function* profileUpdateSaga(action) {
  try {
    const response = yield call(Services.callUpdate, action);
    if (response.status === 200) {
      yield put({
        type: types.UPDATE_USER_SUCCESS,
        auth: response.data.data
      });
    } else {
      yield put({
        type: types.USER_LOGIN_FALSE
      });
    }
  } catch (error) {
    yield put({
      type: types.USER_LOGIN_FALSE
    });
    console.log(error);
  }
}

function* signUpSaga(action) {
  try {
    const response = yield call(Services.callSignUp, action);
    if (response.status === 201) {
      yield put({
        type: types.USER_REGISTRATION_SUCCESS,
        auth: response.data
      });
      toast.info('acount is successfully created.');
    } else {
      yield put({
        type: types.USER_LOGIN_FALSE
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('error is ', error);
      toast.warn(error.response);
    }
    yield put({
      type: types.USER_LOGIN_FALSE
    });
    console.log(error.response);
  }
}

function* signInSaga(action) {
  try {
    const response = yield call(Services.callSignin, action);
    const venueSave = response.data?.savedVenues?.venues || [];
    const normalizeVenue = businessNormalize.venuesId(venueSave);
    if (response.status === 200) {
      yield put({
        type: types.USER_SIGN_IN_SUCCESS,
        auth: response.data.data,
        venues: normalizeVenue
      });
      toast.info('User Login Successfully');
    } else if (response.status === 500) {
      yield put({
        type: types.USER_LOGIN_FALSE
      });
    }
  } catch (error) {
    yield put({
      type: types.USER_LOGIN_FALSE
    });
    if (error.response && error.response.status === 401) {
      toast.warn('Email is not Verified');
    } else if (error.response && error.response.status === 500) {
      toast.warn('Email Does not Exist');
    } else if (error.response && error.response.status === 402) {
      toast.warn('Invalid email or password');
    }
    console.log(error);
  }
}

function* verifySaga(action) {
  try {
    const response = yield call(Services.callVerify, action);
    if (response.status === 201) {
      toast.info('Account is successfully verified');
      yield put({
        type: types.USER_VERIFY_TOKEN_SUCCESS
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn('Invalid Token');
    }
    console.log(error.response);
  }
}

function* resetSaga(action) {
  try {
    const response = yield call(Services.callReset, action);
    if (response.status === 201) {
      toast.info('Password has been reset. Please log in.');
      yield put({
        type: types.USER_RESET_PASSWORD_SUCCESS
      });
      yield put({
        type: types.LOGOUT_SUCCESS
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      yield put({
        type: types.USER_RESET_PASSWORD_SUCCESS
      });
      toast.warn('Use more recent token in your mail list.');
    }
    yield put({
      type: types.USER_RESET_PASSWORD_SUCCESS
    });
    console.log(error.response);
  }
}
function* forGetSaga(action) {
  try {
    const response = yield call(Services.callForGet, action);
    if (response.status === 201) {
      toast.info('Forgot Password Email has been Sent');
      yield put({
        type: types.USER_FOR_GET_PASSWORD_SUCCESS
      });
      yield put({
        type: types.USER_FOR_GET_PASSWORD_SUCCESS
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn('Invalid Token');
      yield put({
        type: types.USER_FOR_GET_PASSWORD_SUCCESS
      });
    }
    yield put({
      type: types.USER_FOR_GET_PASSWORD_SUCCESS
    });
    console.log(error.response);
  }
}

function* logoutSaga(action) {
  try {
    toast.info('Account is successfully Log out');
    yield put({
      type: types.LOGOUT_SUCCESS
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* authWatcher() {
  yield takeLatest(types.UPDATE_USER, profileUpdateSaga);
  yield takeLatest(types.USER_REGISTRATION, signUpSaga);
  yield takeLatest(types.USER_SIGN_IN, signInSaga);
  yield takeLatest(types.LOGOUT, logoutSaga);
  yield takeLatest(types.USER_VERIFY_TOKEN, verifySaga);
  yield takeLatest(types.USER_RESET_PASSWORD, resetSaga);
  yield takeLatest(types.USER_FOR_GET_PASSWORD, forGetSaga);
}
