import * as actionTypes from './actionTypes';

export const getClientInvoices = params => ({
  type: actionTypes.clientInvoices.request,
  params,
});

export const getClientInvoicesSuccess = body => ({
  type: actionTypes.clientInvoices.success,
  body,
});

export const getClientInvoicesError = error => ({
  type: actionTypes.clientInvoices.error,
  error,
});
