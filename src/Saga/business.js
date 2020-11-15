import { takeLatest, call, select, put } from 'redux-saga/effects';
import { selectID } from '../Selectors/auth';
import { toast } from 'react-toastify';
import { selectBusiness, selectUpdateBusiness, selectTypeOfBusiness, selectCountry, selectCity } from '../Selectors/business';
import * as types from '../Types/business';
import * as Services from '../Services/business';
import * as businessNormalize from '../Normalizr/unique.BS';

function* addBusinessSaga(action) {
  try {
    const response = yield call(Services.callAddBusiness, action);
    if (response.status === 201) {
      yield put({
        type: types.USER_BUSINESS_SUCCESS,
        business: response.data.data
      });
      toast.info('Business is Successfull Created.');
    } else {
      yield put({
        type: types.USER_BUSINESS_FAIL,
      });
    }
  } catch (error) {
    yield put({
      type: types.USER_BUSINESS_FAIL,
    });
    console.log(error);
  }
}

function* getBusinessSaga(action) {
  let userID = yield select(selectID);
  action.payload.userID = userID;
  try {
    const response = yield call(Services.callGetBusiness, action);
    yield put({
      type: types.GET_BUSINESS_SUCCESS,
      business: response.data.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* getAllBusinessSaga(action) {
  let country = yield select(selectCountry);
  let city = yield select(selectCity);
  try {
    // yield put({
    //   type: types.TYPE_LOADING_SUCCESS,
    //   payload: true
    // });
    yield put({
      type: types.PAGE_VALUE,
      payload: action.payload.page
    });
    action.payload.country = country;
    action.payload.city = city;
    const response = yield call(Services.callGetAllBusiness, action);
    const normalizeData = businessNormalize.businessNormalize(response.data.data);
    const newVenues = { venue: { ...normalizeData.venue } };
    yield put({
      type: types.GET_ALL_BUSINESS_SUCCESS,
      business: newVenues,
      category: action.payload.typeOfBusiness
    });
    yield put({
      type: types.TYPE_LOADING_SUCCESS,
      payload: false
    });
  } catch (error) {
    console.log(error);
  }
}

function* getScrollBusinessSaga(action) {
  let country = yield select(selectCountry);
  let city = yield select(selectCity);
  try {
    let business = yield select(selectBusiness);
    yield put({
      type: types.PAGE_VALUE,
      payload: action.payload.page
    });
    yield put({
      type: types.TYPE_LOADING_SUCCESS,
      payload: true
    });
    yield put({
      type: types.ADDED_TYPESOF_BUSINESS,
      payload: action.payload.typeOfBusiness
    });
    action.payload.country = country;
    action.payload.city = city
    const response = yield call(Services.callGetAllBusiness, action);
    const normalizeData = businessNormalize.businessNormalize(response.data.data);
    const newVenues = { venue: { ...business, ...normalizeData.venue } };
    yield put({
      type: types.GET_ALL_BUSINESS_SUCCESS,
      business: newVenues,
      category: action.payload.typeOfBusiness,
      pageValue: action.payload.page
    });
    yield put({
      type: types.TYPE_LOADING_SUCCESS,
      payload: false
    });
  } catch (error) {
    console.log(error);
  }
}

function* searchClaimBusinessSaga(action) {
  try {
    const response = yield call(Services.callSearchBusiness, action);
    if (response.data.data.length === 0) {
      toast.warn('Invalid Business Search');
    } else {
      yield put({
        type: types.SEARCH_BUSINESS_SUCCESS,
        business: response.data.data[0]
      });
      // toast.success('Claim your Bussiness Successfully');
    }
  } catch (error) {
    console.log(error);
  }
}

function* homeSearchSaga(action) {
  try {
    const response = yield call(Services.callSearchBusiness, action);
    const venueID = response.data.data[0]._id;
    const normalizeData = businessNormalize.businessNormalize(response.data.data);
    const newVenues = { venue: { ...normalizeData.venue } };
    if (response.data.data.length === 0) {
      toast.warn('No businesses found for this location');
    } else {
      yield put({
        type: types.HOME_SEARCH_SUCCESS,
        business: newVenues,
        venueID: venueID
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* CityHomeSearchSaga(action) {
  try {
    const response = yield call(Services.callVenueBusiness, action);
    const normalizeData = businessNormalize.businessNormalize(response.data.businessess);
    const newVenues = { venue: { ...normalizeData.venue } };
    if (response.data.businessess.length === 0) {
      toast.warn('No businesses found for this location');
      const response = yield call(Services.callForSquareAPI, action);
    } else {
      yield put({
        type: types.CITY_HOME_SEARCH_SUCCESS,
        business: newVenues,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* expploreClickSearchSaga(action) {
  try {
    const response = yield call(Services.callSearchBusiness, action);
    const venueID = response.data.data[0]._id;
    const normalizeData = businessNormalize.businessNormalize(response.data.data);
    const newVenues = { venue: { ...normalizeData.venue } };
    if (response.data.data.length === 0) {
      toast.warn('Invalid Business Search');
    } else {
      yield put({
        type: types.EXPLORE_CLICK_SEARCH_SUCCESS,
        business: newVenues,
        venueID: venueID
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* exploreSearchSaga(action) {
  console.log("saga data ", action.payload)
  let business = yield select(selectTypeOfBusiness);
  let city = yield select(selectCity)
  try {
    action.payload.typeOfBusiness = business;
    action.payload.city = city
    yield put({
      type: types.SEARCH_VALUE,
      business: action.payload
    });
    const response = yield call(Services.callexploreSearch, action);
    console.log("respnose s", response)
    if (response.data.data.length === 0) {
      const response = yield call(Services.callForSquareAPI, action);
    }
    else {
      const normalizeData = businessNormalize.businessNormalize(response.data.data);
      const newVenues = { venue: { ...normalizeData.venue } };
     
      yield put({
        type: types.EXPLORE_SEARCH_SUCCESS,
        business: newVenues
      });
    }
  } catch (error) {
    console.log(error);
  }
}
function* exploreMoreSearchSaga(action) {

  try {
    yield put({
      type: types.CHANGE_SEARCH_VALUE,
      payload: action.payload
    });
    let business = yield select(selectBusiness);
    yield put({
      type: types.TYPE_LOADING_SUCCESS,
      payload: true
    });
    const response = yield call(Services.callexploreSearch, action);
    const normalizeData = businessNormalize.businessNormalize(response.data.data);
    const newVenues = { venue: { ...business, ...normalizeData.venue } };
    yield put({
      type: types.EXPLORE_MORE_SEARCH_SUCCESS,
      business: newVenues
    });
    yield put({
      type: types.TYPE_LOADING_SUCCESS,
      payload: false
    });
  } catch (error) {
    console.log(error);
  }
}

function* exploreMapSaga(action) {
  try {
    yield put({
      type: types.EXPLORE_MAP_SUCCESS,
      business: action.payload
    });
  } catch (error) {
    console.log(error);
  }
}
function* exploreGridSaga(action) {
  try {
    yield put({
      type: types.EXPLORE_GRID_SUCCESS,
      business: action.payload
    });
  } catch (error) {
    console.log(error);
  }
}

function* updateBusinessSaga(action) {
  console.log("my stack", action.payload)
  try {
    let _id = yield select(selectUpdateBusiness);
    action.payload._id = _id;
    const response = yield call(Services.callUpdateBusiness, action);
    if (response.status === 200) {
      yield put({
        type: types.UPDATE_BUSINESS_SUCCESS,
        business: response.data.data[0]
      });
      toast.info('Business claimed successfully');
    } else {
    }
  } catch (error) {
    console.log(error);
  }
}

function* getVenueBusiness(action) {
  try {
    yield put({
      type: types.TYPE_LOADING_SUCCESS,
      payload: true
    });
    const response = yield call(Services.callVenueBusiness, action);
    yield put({
      type: types.VENUE_BUSINESS_SUCCESS,
      business: response.data.businesses
    });
    yield put({
      type: types.TYPE_LOADING_SUCCESS,
      payload: false
    });
  } catch (error) {
    console.log(error);
  }
}
function* viewsUpdateSaga(action) {
  try {
    const response = yield call(Services.callVenuesUpdate, action);
    yield put({
      type: types.VIEWS_UPDATE_SUCCESS,
      payload: response.data.data._id
    });
  } catch (error) {
    console.log(error);
  }
}

function* trendingDataSaga(action) {
  try {
    const response = yield call(Services.callTrendingData, action);
    yield put({
      type: types.TRENDING_DATA_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error);
  }
}
function* nearBusiness(action) {
  try {
    let distance = action.payload.distance
    if (distance === true) {
      const response = yield call(Services.callNearData, action);
      const normalizeData = businessNormalize.businessNormalize(response.data.data);
      const newVenues = { venue: { ...normalizeData.venue } };
      yield put({
        type: types.SAVE_CURRENT_LOCATION_SUCCESS,
        payload: newVenues
      });
    }
    else {

    }

  } catch (error) {
    console.log(error);
  }
}
function* nearScrollBusiness(action) {
  try {
    let business = yield select(selectBusiness);

    const response = yield call(Services.callNearData, action);
    const normalizeData = businessNormalize.businessNormalize(response.data.data);
    const newVenues = { venue: { ...business, ...normalizeData.venue } };
    yield put({
      type: types.SAVE_CURRENT_LOCATION_SUCCESS,
      payload: newVenues
    });
  } catch (error) {
    console.log(error);
  }
}
export default function* businessWatcher() {
  yield takeLatest(types.USER_BUSINESS, addBusinessSaga);
  yield takeLatest(types.GET_BUSINESS, getBusinessSaga);
  yield takeLatest(types.GET_ALL_BUSINESS, getAllBusinessSaga);
  yield takeLatest(types.SEARCH_BUSINESS, searchClaimBusinessSaga);
  yield takeLatest(types.UPDATE_BUSINESS, updateBusinessSaga);
  yield takeLatest(types.GET_SCROLL_BUSINESS, getScrollBusinessSaga);
  yield takeLatest(types.VENUE_BUSINESS, getVenueBusiness);
  yield takeLatest(types.HOME_SEARCH, homeSearchSaga);
  yield takeLatest(types.CITY_HOME_SEARCH, CityHomeSearchSaga);
  yield takeLatest(types.EXPLORE_CLICK_SEARCH, expploreClickSearchSaga);
  yield takeLatest(types.EXPLORE_SEARCH, exploreSearchSaga);
  yield takeLatest(types.EXPLORE_MAP, exploreMapSaga);
  yield takeLatest(types.EXPLORE_GRID, exploreGridSaga);
  yield takeLatest(types.EXPLORE_MORE_SEARCH, exploreMoreSearchSaga);
  yield takeLatest(types.VIEWS_UPDATE, viewsUpdateSaga);
  yield takeLatest(types.TRENDING_DATA, trendingDataSaga);
  yield takeLatest(types.SAVE_CURRENT_LOCATION, nearBusiness);
  yield takeLatest(types.NEAR_SCROOL_LOCATION, nearScrollBusiness);

}
