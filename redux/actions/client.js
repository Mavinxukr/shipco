import * as actionTypes from './actionTypes';

export const getClient = params => ({
  type: actionTypes.client.request,
  params,
});

export const deleteClient = (params, body) => ({
  type: actionTypes.client.delete,
  params,
  body,
});

export const getClientSuccess = body => ({
  type: actionTypes.client.success,
  body,
});

export const getClientError = error => ({
  type: actionTypes.client.error,
  error,
});
