import * as actionTypes from './actionTypes';

export const getAutoByContainer = params => ({
  type: actionTypes.autoByContainer.request,
  params,
});

export const getAutoByContainerSuccess = body => ({
  type: actionTypes.autoByContainer.success,
  body,
});

export const getAutoByContainerError = error => ({
  type: actionTypes.autoByContainer.error,
  error,
});
