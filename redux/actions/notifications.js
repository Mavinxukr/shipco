import * as actionTypes from './actionTypes';

export const getNotifications = params => ({
  type: actionTypes.notifications.request,
  params,
});

export const getNotificationsSuccess = body => ({
  type: actionTypes.notifications.success,
  body,
});

export const getNotificationsError = error => ({
  type: actionTypes.notifications.error,
  error,
});
