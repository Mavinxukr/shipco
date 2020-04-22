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
  state => state.parts.partsData,
  partsData => partsData,
);

export const partsDataReceivedSelector = createSelector(
  state => state.parts.isDataReceived,
  isDataReceived => isDataReceived,
);
export const clientPartsDataSelector = createSelector(
  state => state.clientParts.clientPartsData,
  partsData => partsData,
);

export const clientPartsDataReceivedSelector = createSelector(
  state => state.clientParts.isDataReceived,
  isDataReceived => isDataReceived,
);

export const shippingDataSelector = createSelector(
  state => state.shipping.shippingData,
  shippingData => shippingData,
);

export const shippingDataReceivedSelector = createSelector(
  state => state.shipping.isDataReceived,
  isDataReceived => isDataReceived,
);

export const clientShippingDataSelector = createSelector(
  state => state.clientShipping.clientShippingData,
  clientShippingData => clientShippingData,
);

export const clientShippingDataReceivedSelector = createSelector(
  state => state.clientShipping.isDataReceived,
  isDataReceived => isDataReceived,
);

export const dismantingDataSelector = createSelector(
  state => state.dismanting.dismantingData,
  dismantingData => dismantingData,
);

export const dismantingDataReceivedSelector = createSelector(
  state => state.dismanting.isDataReceived,
  isDataReceived => isDataReceived,
);

export const clientDismantingDataSelector = createSelector(
  state => state.clientDismanting.clientDismantingData,
  clientDismantingData => clientDismantingData,
);

export const autoByContainerDataSelector = createSelector(
  state => state.autoByContainer.autoByContainerData,
  autoByContainerData => autoByContainerData,
);

export const clientDismantingDataReceivedSelector = createSelector(
  state => state.clientDismanting.isDataReceived,
  isDataReceived => isDataReceived,
);

export const invoicesDataSelector = createSelector(
  state => state.invoices.invoicesData,
  invoicesData => invoicesData,
);

export const invoicesDataReceivedSelector = createSelector(
  state => state.invoices.isDataReceived,
  isDataReceived => isDataReceived,
);

export const clientInvoicesDataSelector = createSelector(
  state => state.clientInvoices.clientInvoicesData,
  clientInvoicesData => clientInvoicesData,
);

export const clientInvoicesDataReceivedSelector = createSelector(
  state => state.clientInvoices.isDataReceived,
  isDataReceived => isDataReceived,
);

export const groupsDataSelector = createSelector(
  state => state.groups.groupsData,
  groupsData => groupsData,
);

export const groupsDataReceivedSelector = createSelector(
  state => state.groups.isDataReceived,
  isDataReceived => isDataReceived,
);

export const pricesDataSelector = createSelector(
  state => state.prices.pricesData,
  pricesData => pricesData,
);

export const pricesDataReceivedSelector = createSelector(
  state => state.prices.isDataReceived,
  isDataReceived => isDataReceived,
);
