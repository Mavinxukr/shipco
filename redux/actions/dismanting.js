import * as actionTypes from './actionTypes';

export const getDismanting = params => ({
  type: actionTypes.dismanting.request,
  params,
});

export const getВismantingSuccess = body => ({
  type: actionTypes.dismanting.success,
  body,
});

export const getВismantingError = error => ({
  type: actionTypes.dismanting.error,
  error,
});
