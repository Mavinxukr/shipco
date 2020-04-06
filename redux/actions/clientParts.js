import * as actionTypes from './actionTypes';

export const getClientParts = params => ({
  type: actionTypes.clientParts.request,
  params,
});

export const addNewClientParts = (params, body) => ({
  type: actionTypes.clientParts.save,
  params,
  body,
});

export const deleteClientParts = (params, id) => ({
  type: actionTypes.clientParts.delete,
  id,
});

export const getClientPartsSuccess = body => ({
  type: actionTypes.clientParts.success,
  body,
});

export const getClientPartsError = error => ({
  type: actionTypes.clientParts.error,
  error,
});
