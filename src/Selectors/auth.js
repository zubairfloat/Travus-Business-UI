export const selectEmail = state => {
  return state.auth.user.email;
};

export const selectID = state => {
  return state.auth.user.userId;
};
export const selectUserName = state => {
  return state.auth.user.username;
};
