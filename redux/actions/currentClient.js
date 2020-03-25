import * as actionTypes from './actionTypes';

export const getCurrentClient = (params, id) => ({
  type: actionTypes.currentClient.request,
  params,
  id,
});

export const updateCurrentClient = (params, body, id) => ({
  type: actionTypes.currentClient.update,
  params,
  body,
  id,
});

export const getCurrentClientSuccess = body => ({
  type: actionTypes.currentClient.success,
  body,
});

export const getCurrentClientError = error => ({
  type: actionTypes.currentClient.error,
  error,
});
