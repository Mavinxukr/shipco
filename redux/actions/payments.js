import * as actionTypes from './actionTypes';

export const getPayments = (params, id) => ({
  type: actionTypes.payments.request,
  params,
  id,
});

export const addNewPayments = (params, body) => ({
  type: actionTypes.payments.save,
  params,
  body,
});

export const deletePayments = (params, id) => ({
  type: actionTypes.payments.delete,
  params,
  id,
});

export const updatePayments = (params, body, id) => ({
  type: actionTypes.payments.update,
  params,
  body,
  id,
});

export const getPaymentsSuccess = body => ({
  type: actionTypes.payments.success,
  body,
});

export const getPaymentsError = error => ({
  type: actionTypes.payments.error,
  error,
});
