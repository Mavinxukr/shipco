import { createSelector } from 'reselect';

export const isAuthSelector = createSelector(
  state => state.currentUser.isAuth,
  isAuth => isAuth,
);

export const currentUserDataSelector = createSelector(
  state => state.currentUser.currentUser,
  currentUser => currentUser,
);

export const overviewDataSelector = createSelector(
  state => state.overview.overviewData,
  overviewData => overviewData,
);

export const overviewDataReceivedSelector = createSelector(
  state => state.overview.isDataReceived,
  isDataReceived => isDataReceived,
);

export const notificationsDataSelector = createSelector(
  state => state.notifications.notificationsData,
  notificationsData => notificationsData,
);

export const notificationDataReceivedSelector = createSelector(
  state => state.notifications.isDataReceived,
  isDataReceived => isDataReceived,
);

export const baseClientDataSelector = createSelector(
  state => state.baseClient.baseClientData,
  baseClientData => baseClientData,
);

export const baseClientDataReceivedSelector = createSelector(
  state => state.baseClient.isDataReceived,
  isDataReceived => isDataReceived,
);
