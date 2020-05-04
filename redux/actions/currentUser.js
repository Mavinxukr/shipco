import * as actionTypes from './actionTypes';

export const getCurrentUser = params => ({
  type: actionTypes.currentUser.request,
  params,
});

export const logoutCurrentUser = (params, co, isUserLogOut) => ({
  type: actionTypes.currentUser.delete,
  params,
  co,
  isUserLogOut,
});

export const editCurrentUser = (params, body) => ({
  type: actionTypes.currentUser.update,
  params,
  body,
});

export const getCurrentUserSuccess = body => ({
  type: actionTypes.currentUser.success,
  body,
});

export const getCurrentUserError = error => ({
  type: actionTypes.currentUser.error,
  error,
});
