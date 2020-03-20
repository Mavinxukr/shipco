import * as actionTypes from './actionTypes';

export const getOverview = params => ({
  type: actionTypes.overview.request,
  params,
});

export const getOverviewSuccess = body => ({
  type: actionTypes.overview.success,
  body,
});

export const getOverviewError = error => ({
  type: actionTypes.overview.error,
  error,
});
