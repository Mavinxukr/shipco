import * as actionTypes from './actionTypes';

export const getClientShipping = params => ({
  type: actionTypes.clientShipping.request,
  params,
});

export const updateClientShipping = (params, body) => ({
  type: actionTypes.clientShipping.update,
  params,
  body,
});

export const getClientShippingSuccess = body => ({
  type: actionTypes.clientShipping.success,
  body,
});

export const getClientShippingError = error => ({
  type: actionTypes.clientShipping.error,
  error,
});
