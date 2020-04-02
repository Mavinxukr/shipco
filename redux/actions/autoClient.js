import * as actionTypes from './actionTypes';

export const getAutoClient = (params, id) => ({
  type: actionTypes.autoClient.request,
  params,
  id,
});

export const getAutoClientSuccess = body => ({
  type: actionTypes.autoClient.success,
  body,
});

export const getAutoClientError = error => ({
  type: actionTypes.autoClient.error,
  error,
});
