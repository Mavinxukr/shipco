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

export const clientDataSelector = createSelector(
  state => state.client.clientData,
  clientData => clientData,
);

export const clientDataReceivedSelector = createSelector(
  state => state.client.isDataReceived,
  isDataReceived => isDataReceived,
);

export const currentClientDataSelector = createSelector(
  state => state.currentClient.currentClient,
  currentClient => currentClient,
);

export const currentClientDataReceivedSelector = createSelector(
  state => state.currentClient.isDataReceived,
  isDataReceived => isDataReceived,
);

export const autoDataSelector = createSelector(
  state => state.auto.autoData,
  autoData => autoData,
);

export const autoDataReceivedSelector = createSelector(
  state => state.auto.isDataReceived,
  isDataReceived => isDataReceived,
);

export const autoClientDataSelector = createSelector(
  state => state.autoClient.autoClientData,
  autoClientData => autoClientData,
);

export const autoClientDataReceivedSelector = createSelector(
  state => state.autoClient.isDataReceived,
  isDataReceived => isDataReceived,
);

export const autoIdDataSelector = createSelector(
  state => state.autoId.autoIdData,
  autoIdData => autoIdData,
);

export const autoIdDataReceivedSelector = createSelector(
  state => state.autoId.isDataReceived,
  isDataReceived => isDataReceived,
);

export const partsDataSelector = createSelector(
  state => state.parts.partsDara,
  partsDara => partsDara,
);

export const partsDataReceivedSelector = createSelector(
  state => state.parts.isDataReceived,
  isDataReceived => isDataReceived,
);
