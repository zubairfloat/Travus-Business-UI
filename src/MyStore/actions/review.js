import * as types from '../../Types/review';

export function AddReview(review) {
  return {
    type: types.ADD_REVIEW,
    payload: review
  };
}

export function getReview(select) {
  return {
    type: types.GET_REVIEW,
    payload: select
  };
}
