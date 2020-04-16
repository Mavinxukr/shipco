import * as actionTypes from './actionTypes';

export const getClientDismanting = params => ({
  type: actionTypes.clientDismanting.request,
  params,
});

export const updateClientDismanting = (params, body) => ({
  type: actionTypes.clientDismanting.update,
  params,
  body,
});

export const getClientDismantingSuccess = body => ({
  type: actionTypes.clientDismanting.success,
  body,
});

export const getClientDismantingError = error => ({
  type: actionTypes.clientDismanting.error,
  error,
});
