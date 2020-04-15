import * as actionTypes from './actionTypes';

export const getInvoices = params => ({
  type: actionTypes.invoices.request,
  params,
});

export const getInvoicesSuccess = body => ({
  type: actionTypes.invoices.success,
  body,
});

export const getInvoicesError = error => ({
  type: actionTypes.invoices.error,
  error,
});
