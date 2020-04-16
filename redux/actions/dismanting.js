import * as actionTypes from './actionTypes';

export const getDismanting = params => ({
  type: actionTypes.dismanting.request,
  params,
});

export const updateDismanting = (params, body, id, isNote) => ({
  type: actionTypes.dismanting.update,
  params,
  body,
  id,
  isNote,
});

export const getDismantingSuccess = body => ({
  type: actionTypes.dismanting.success,
  body,
});

export const getDismantingError = error => ({
  type: actionTypes.dismanting.error,
  error,
});
