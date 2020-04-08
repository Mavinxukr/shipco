import * as actionTypes from './actionTypes';

export const getShipping = params => ({
  type: actionTypes.shipping.request,
  params,
});

export const getShippingSuccess = body => ({
  type: actionTypes.shipping.success,
  body,
});

export const getShippingError = error => ({
  type: actionTypes.shipping.error,
  error,
});
