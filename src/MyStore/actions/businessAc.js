import * as types from '../../Types/business';

export function AddBusiness(businessUser) {
  return {
    type: types.USER_BUSINESS,
    payload: businessUser
  };
}

export function getBusiness(setbusiness) {
  return {
    type: types.GET_BUSINESS,
    payload: setbusiness
  };
}

export function getAllBusiness(setAllBusiness) {
  return {
    type: types.GET_ALL_BUSINESS,
    payload: setAllBusiness,
  };
}
export function searchFalse(searchChange) {
  return {
    type: types.SEARCH_FALSE,
    payload: searchChange
  };
}

export function searchMyClaimBusiness(businessName) {
  return {
    type: types.SEARCH_BUSINESS,
    payload: businessName
  };
}

export function homeSearch(payload) {
  return {
    type: types.CITY_HOME_SEARCH,
    payload: payload
  };
}
export function exploreClickSearch(businessName) {
  return {
    type: types.HOME_SEARCH,
    payload: businessName
  };
}

export function exploreSearch(data) {
  console.log("explore action payload" , data)
  return {
    type: types.EXPLORE_SEARCH,
    payload: data
  };
}
export function exploreMoreSearch(data) {
  return {
    type: types.EXPLORE_MORE_SEARCH,
    payload: data
  };
}
export function countriesName(value) {
  return {
    type: types.EXPLORE_COUNTRY,
    payload: value.value.label
  };
}

export function setMapValue(value) {
  return {
    type: types.EXPLORE_MAP,
    payload: value
  };
}
export function setGridValue(value) {
  return {
    type: types.EXPLORE_GRID,
    payload: value
  };
}

export function businessUpdate(update) {
  return {
    type: types.UPDATE_BUSINESS,
    payload: update
  };
}

export function getScrollBusiness(setAllBusiness) {
  return {
    type: types.GET_SCROLL_BUSINESS,
    payload: setAllBusiness
  };
}

export function selectBusiness(id) {
  return {
    type: types.SELECT_BUSINESS,
    payload: id
  };
}

export function venueBusiness(venue) {
  return {
    type: types.VENUE_BUSINESS,
    payload: venue
  };
}

export function viewsUpdate(_id) {
  return {
    type: types.VIEWS_UPDATE,
    payload: _id
  };
}

export function trendingData() {
  return {
    type: types.TRENDING_DATA,
  };
}

export function selectTrending(id) {
  return {
    type: types.SELECT_TRENDING,
    payload: id
  };
}
export function getSortViews(sort) {
  return {
    type: types.SORTING_VIEWS,
    payload: sort
  };
}
export function sortNearDistance(sort) {
  return {
    type: types.NEAR_DISTANCE,
    payload: sort
  };
}
export function getCurrentLocation(payload) {
  return {
    type: types.SAVE_CURRENT_LOCATION,
    payload: payload
  };
}
export function getScroolLocation(payload) {
  return {
    type: types.NEAR_SCROOL_LOCATION,
    payload: payload
  };
}
