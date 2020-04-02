import * as actionTypes from './actionTypes';

export const getParts = params => ({
  type: actionTypes.parts.request,
  params,
});

export const getPartsSuccess = body => ({
  type: actionTypes.parts.success,
  body,
});

export const getPartsError = error => ({
  type: actionTypes.parts.error,
  error,
});
