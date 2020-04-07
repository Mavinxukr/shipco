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

export const deleteParts = (params, body, id, isImage) => ({
  type: actionTypes.parts.delete,
  body,
  id,
  isImage,
});

export const updateParts = (params, body, id) => ({
  type: actionTypes.parts.update,
  body,
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
