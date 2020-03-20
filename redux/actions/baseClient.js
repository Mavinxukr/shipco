import * as actionTypes from './actionTypes';

export const getBaseClient = params => ({
  type: actionTypes.baseClient.request,
  params,
});

export const deleteBaseClient = (params, body) => ({
  type: actionTypes.baseClient.delete,
  params,
  body,
});

export const addNewBaseClient = (params, body) => ({
  type: actionTypes.baseClient.save,
  params,
  body,
});

export const getBaseClientSuccess = body => ({
  type: actionTypes.baseClient.success,
  body,
});

export const getBaseClientError = error => ({
  type: actionTypes.baseClient.error,
  error,
});
