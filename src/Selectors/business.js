export const selectBusiness = state => {
  return state.business.businessList.venue;
};
export const selectUpdateBusiness = state => {
  return state.business.searchBusiness._id;
};

export const selectTypeOfBusiness = state => {
  return state.business.typeOfBusiness;
};
export const selectCountry = state => {
  return state.business.country;
};
export const selectCity = state => {
  return state.business.city;
};
export const selectPage = state => {
  return state.business.page;
};

export const selectType = state => {
  return 'food';
};
