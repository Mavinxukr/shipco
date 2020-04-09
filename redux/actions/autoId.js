import * as actionTypes from './actionTypes';

export const getAutoId = (params, id) => ({
  type: actionTypes.autoId.request,
  params,
  id,
});

export const updateAutoId = (params, body) => ({
  type: actionTypes.autoId.update,
  params,
  body,
});

export const getAutoIdSuccess = body => ({
  type: actionTypes.autoId.success,
  body,
});

export const getAutoIdError = error => ({
  type: actionTypes.autoId.error,
  error,
});
