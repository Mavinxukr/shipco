import * as actionTypes from './actionTypes';

export const getPrices = (params, id) => ({
  type: actionTypes.prices.request,
  params,
  id,
});

export const addNewPrices = (params, body) => ({
  type: actionTypes.prices.save,
  params,
  body,
});

export const deletePrices = (params, id) => ({
  type: actionTypes.prices.delete,
  params,
  id,
});

export const updatePrices = (params, body, id) => ({
  type: actionTypes.prices.update,
  params,
  body,
  id,
});

export const getPricesSuccess = body => ({
  type: actionTypes.prices.success,
  body,
});

export const getPricesError = error => ({
  type: actionTypes.prices.error,
  error,
});
