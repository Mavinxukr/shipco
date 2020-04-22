import * as actionTypes from './actionTypes';

export const getPrices = params => ({
  type: actionTypes.prices.request,
  params,
});

export const addNewPrices = (params, body) => ({
  type: actionTypes.prices.save,
  params,
  body,
});

export const getPricesSuccess = body => ({
  type: actionTypes.prices.success,
  body,
});

export const getPricesError = error => ({
  type: actionTypes.prices.error,
  error,
});
