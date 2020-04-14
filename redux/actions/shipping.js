import * as actionTypes from './actionTypes';

export const getShipping = params => ({
  type: actionTypes.shipping.request,
  params,
});

export const updateShipping = (params, body, id, isNote) => ({
  type: actionTypes.shipping.update,
  params,
  body,
  id,
  isNote,
});

export const storeShipping = (params, body) => ({
  type: actionTypes.shipping.save,
  params,
  body,
});

export const getShippingSuccess = body => ({
  type: actionTypes.shipping.success,
  body,
});

export const getShippingError = error => ({
  type: actionTypes.shipping.error,
  error,
});
