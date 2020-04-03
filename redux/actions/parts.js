import * as actionTypes from './actionTypes';

export const getParts = params => ({
  type: actionTypes.parts.request,
  params,
});

export const addNewParts = (params, body) => ({
  type: actionTypes.parts.save,
  params,
  body,
});

export const deleteParts = (params, id) => ({
  type: actionTypes.parts.delete,
  id,
});

export const getPartsSuccess = body => ({
  type: actionTypes.parts.success,
  body,
});

export const getPartsError = error => ({
  type: actionTypes.parts.error,
  error,
});
