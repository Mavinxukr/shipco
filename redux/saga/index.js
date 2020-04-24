import { all } from 'redux-saga/effects';
import { watchGetCurrentUser } from './userData/getCurrentUser';
import { watchEditCurrentUser } from './userData/editCurrentUser';
import { watchGetOverview } from './getOverview';
import { watchGetNotifications } from './getNotifications';
import { watchGetBaseClient } from './baseClient/getBaseClient';
import { watchDeleteBaseClient } from './baseClient/deleteBaseClient';
import { watchAddNewBaseClient } from './baseClient/addNewBaseClient';
import { watchGetClient } from './client/getClient';
import { watchAddNewClient } from './client/addNewClient';
import { watchGetCurrentClient } from './currentClient/getCurrentClient';
import { watchDeleteClient } from './client/deleteClient';
import { watchUpdateCurrentClient } from './currentClient/updateCurrentClient';
import { watchGetAuto } from './auto/getAuto';
import { watchUpdateAuto } from './auto/updateAuto';
import { watchDeleteAutoDocument } from './auto/deleteAutoDocument';
import { watchAutoClient } from './getAutoClient';
import { watchAutoId } from './getAutoId';
import { watchParts } from './parts/getParts';
import { watchDeleteParts } from './parts/deleteParts';
import { watchAddNewParts } from './parts/addNewParts';
import { watchUpdateParts } from './parts/updateParts';
import { watchClientParts } from './clientParts/getClientParts';
import { watchAddNewClientParts } from './clientParts/addNewClientParts';
import { watchDeleteClientParts } from './clientParts/deleteClietnParts';
import { watchUpdateClientParts } from './clientParts/updateClientParts';
import { watchShipping } from './shipping/getShipping';
import { watchUpdateShipping } from './shipping/updateShipping';
import { watchUpdateAutoId } from './updateAutoId';
import { watchClientShipping } from './clientShippimg/getClientShipping';
import { watchClientUpdateShipping } from './clientShippimg/updateClientShipping';
import { watchDismanting } from './dismanting/getDismanting';
import { watchUpdateDismanting } from './dismanting/updateDismanting';
import { watchClientDismanting } from './getClientDismanting';
import { watchautoByContainer } from './autoByContainer';
import { watchStoreShipping } from './shipping/storeShipping';
import { watchInvoices } from './invoices/getInvoices';
import { watchUpdateInvoices } from './invoices/updateInvoices';
import { watchClientInvoices } from './getClientInvoices';
import { watchClientUpdateDismanting } from './updateClientDismanting';
import { watchGetGroups } from './groups/getGroups';
import { watchDeleteGroups } from './groups/deleteGroups';
import { watchAddGroups } from './groups/addGroups';
import { watchUpdateGroups } from './groups/updateGroups';
import { watchGetPrices } from './prices/getPrices';
import { watchAddPrices } from './prices/addPrices';
import { watchDeletePrices } from './prices/deletePrices';
import { watchUpdatePrices } from './prices/updatePrices';

export function* rootSaga() {
  yield all([
    watchGetCurrentUser(),
    watchGetOverview(),
    watchEditCurrentUser(),
    watchGetNotifications(),
    watchGetBaseClient(),
    watchDeleteBaseClient(),
    watchAddNewBaseClient(),
    watchGetClient(),
    watchAddNewClient(),
    watchGetCurrentClient(),
    watchDeleteClient(),
    watchUpdateCurrentClient(),
    watchGetAuto(),
    watchUpdateAuto(),
    watchDeleteAutoDocument(),
    watchAutoClient(),
    watchAutoId(),
    watchParts(),
    watchDeleteParts(),
    watchAddNewParts(),
    watchUpdateParts(),
    watchClientParts(),
    watchAddNewClientParts(),
    watchDeleteClientParts(),
    watchUpdateClientParts(),
    watchShipping(),
    watchUpdateAutoId(),
    watchUpdateShipping(),
    watchClientShipping(),
    watchClientUpdateShipping(),
    watchDismanting(),
    watchUpdateDismanting(),
    watchClientDismanting(),
    watchautoByContainer(),
    watchStoreShipping(),
    watchInvoices(),
    watchUpdateInvoices(),
    watchClientInvoices(),
    watchClientUpdateDismanting(),
    watchGetGroups(),
    watchDeleteGroups(),
    watchAddGroups(),
    watchUpdateGroups(),
    watchGetPrices(),
    watchAddPrices(),
    watchDeletePrices(),
    watchUpdatePrices(),
  ]);
}
