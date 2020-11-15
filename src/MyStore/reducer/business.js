import * as types from '../../Types/business';

const initState = {
  businessList: [],
  page: 1,
  searchBusiness: false,
  claimBusiness: "",
  search: false,
  create: false,
  slectedVanue: -1,
  loading: false,
  map: false,
  typeOfBusiness: '',
  city: "All Cities",
  searchValue: '',
  pagination: 15,
  trending: [],
  selectTrending: null,
  sortRating: false,
  distance: false,
  currentLocation: [],
  distanceValue: "",
  skeltonLoading: false,
  searchClaim: false,
};
const businessReducer = (state = initState, action) => {
  switch (action.type) {
    case types.USER_BUSINESS:
      state = {
        ...state,
        loading: true,
        create: false
      };
      break;
    case types.USER_BUSINESS_SUCCESS:
      state = {
        ...state,
        businessList: action.business,
        loading: false,
        create: true
      };
      break;
    case types.USER_BUSINESS_FAIL:
      state = {
        ...state,
        loading: false
      };
      break;
    case types.GET_BUSINESS_SUCCESS:
      state = {
        ...state,
        businessList: action.business
      };
      break;
    case types.GET_ALL_BUSINESS:
      state = {
        ...state,
       skeltonLoading: true, 
      };
      break;
    case types.GET_ALL_BUSINESS_SUCCESS:
      state = {
        ...state,
        businessList: action.business,
        slectedVanue: -1,
        typeOfBusiness: action.category,
        skeltonLoading: false
      };
      break;
    case types.HOME_SEARCH_SUCCESS:
      state = {
        ...state,
        businessList: action.business,
        slectedVanue: action.venueID
      };
      break;
    case types.CITY_HOME_SEARCH:
      state = {
        ...state,
        city: action.payload.cityName,
        searchValue: '',
        distance: false,
        page: 1
      };
      break;
    case types.CITY_HOME_SEARCH_SUCCESS:
      state = {
        ...state,
        businessList: action.business,
      };
      break;
    case types.EXPLORE_CLICK_SEARCH_SUCCESS:
      state = {
        ...state,
        businessList: action.business,
        slectedVanue: action.venueID
      };
      break;
    case types.ADDED_TYPESOF_BUSINESS:
      state = {
        ...state,
        typeOfBusiness: action.payload
      };
      break;
    case types.EXPLORE_SEARCH_SUCCESS:
      state = {
        ...state,
        businessList: action.business,
        search: true
      };
      break;
    case types.EXPLORE_MORE_SEARCH_SUCCESS:
      state = {
        ...state,
        businessList: action.business,
        search: true
      };
      break;
    case types.SEARCH_VALUE:
      state = {
        ...state,
        searchValue: action.business,
        search: true
      };
      break;
    case types.SEARCH_FALSE:
      state = {
        ...state,
        searchValue: action.payload,
        search: false
      };
      break;
    case types.PAGE_VALUE:
      state = {
        ...state,
        page: action.payload,
      };
      break;
    case types.CHANGE_SEARCH_VALUE:
      state = {
        ...state,
        searchValue: action.payload,
        search: true
      };
      break;
    case types.EXPLORE_MAP_SUCCESS:
      state = {
        ...state,
        map: true,
        loading: false
      };
      break;
    case types.EXPLORE_GRID_SUCCESS:
      state = {
        ...state,
        map: false
      };
      break;
    case types.SEARCH_BUSINESS_SUCCESS:
      state = {
        ...state,
        searchClaim: true,
        searchBusiness: action.business
      };
      break;
    case types.UPDATE_BUSINESS_SUCCESS:
      state = {
        ...state,
        searchClaim: false,
      
      };
      break;
    case types.TYPE_LOADING_SUCCESS:
      state = {
        ...state,
        loading: action.payload
      };
      break;
    case types.SELECT_BUSINESS:
      state = {
        ...state,
        slectedVanue: action.payload,
        selectTrending: null
      };
      break;
    case types.VENUE_BUSINESS_SUCCESS:
      state = {
        ...state,
        tripBusiness: action.business
      };
      break;
    case types.VIEWS_UPDATE_SUCCESS:
      const business = { ...state.business }
      business.businessList.venue[action.payload].views += 1;
      state = {
        ...state,
        business
      };
      break;
    case types.TRENDING_DATA_SUCCESS:
      state = {
        ...state,
        trending: action.payload,
        selectTrending: null
      };
      break;
    case types.SELECT_TRENDING:
      state = {
        ...state,
        selectTrending: action.payload,
        slectedVanue: -1
      };
      break;
    case types.SORTING_VIEWS:
      state = {
        ...state,
        sortRating: action.payload,
        page: 1,
      };
      break;
    case types.NEAR_DISTANCE:
      state = {
        ...state,
        distance: action.payload,
        page: 1,
      };
      break;
    case types.SAVE_CURRENT_LOCATION:
      state = {
        ...state,
        currentLocation: action.payload.name,
        distanceValue: action.payload.value,
        page: 1
      };
      break;
    case types.NEAR_SCROOL_LOCATION:
      state = {
        ...state,
        page: action.payload.page
      };
      break;
    case types.SAVE_CURRENT_LOCATION_SUCCESS:
      state = {
        ...state,
        businessList: action.payload,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default businessReducer;
