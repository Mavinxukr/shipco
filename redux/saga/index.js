import { all } from 'redux-saga/effects';
import { watchGetCurrentUser } from './userData/getCurrentUser';
import { watchEditCurrentUser } from './userData/editCurrentUser';
import { watchGetOverview } from './getOverview';
import { watchGetNotifications } from './getNotifications';
import { watchGetBaseClient } from './baseClient/getBaseClient';
import { watchDeleteBaseClient } from './baseClient/deleteBaseClient';
import { watchAddNewBaseClient } from './baseClient/addNewBaseClient';
import { watchGetClient } from './client/getClient';
import { watchGetCurrentClient } from './currentClient/getCurrentClient';
import { watchDeleteClient } from './client/deleteClient';
import { watchUpdateCurrentClient } from './currentClient/updateCurrentClient';
import { watchGetAuto } from './auto/getAuto';
import { watchUpdateAuto } from './auto/updateAuto';
import { watchDeleteAutoDocument } from './auto/deleteAutoDocument';
import { watchAutoClient } from './getAutoClient';
import { watchAutoId } from './getAutoId';
import { watchParts } from './parts/getParts';

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
    watchGetCurrentClient(),
    watchDeleteClient(),
    watchUpdateCurrentClient(),
    watchGetAuto(),
    watchUpdateAuto(),
    watchDeleteAutoDocument(),
    watchAutoClient(),
    watchAutoId(),
    watchParts(),
  ]);
}
