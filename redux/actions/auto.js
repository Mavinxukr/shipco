import * as actionTypes from './actionTypes';

export const getAuto = (params, id) => ({
  type: actionTypes.auto.request,
  params,
  id,
});

export const updateAuto = (params, body, id) => ({
  type: actionTypes.auto.update,
  params,
  body,
  id,
});

export const deleteAuto = (params, body, id) => ({
  type: actionTypes.auto.delete,
  params,
  body,
  id,
});

export const getAutoSuccess = body => ({
  type: actionTypes.auto.success,
  body,
});

export const getAutoError = error => ({
  type: actionTypes.auto.error,
  error,
});
