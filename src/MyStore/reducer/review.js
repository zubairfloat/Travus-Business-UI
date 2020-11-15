import * as types from '../../Types/review';

const initState = {
  review: [],
  reviewAdded: false,
  loading: false,
  avgRating: [],
};
const reviewReducer = (state = initState, action) => {
  switch (action.type) {
    case types.TYPE_LOADING_SUCCESS:
      state = {
        ...state,
        loading: action.payload
      };
      break;
    case types.ADD_REVIEW:
      state = {
        ...state,
       reviewAdded : false,
       loading: true
      };
      break;
    case types.ADD_REVIEW_SUCCESS:
      state = {
        ...state,
        review: state.review.concat(action.reviews),
        reviewAdded: true ,
        loading: false
      };
      break;
      case types.ADD_REVIEW_FAIL:
      state = {
        ...state,
        reviewAdded: true ,
        loading: false
      };
      break;
    case types.GET_REVIEW_SUCCESS:
      state = {
        ...state,
        review: action.reviews,
        avgRating: action.rating
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reviewReducer;
