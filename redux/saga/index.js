import { all } from 'redux-saga/effects';
import { watchGetCurrentUser } from './userData/getCurrentUser';
import { watchEditCurrentUser } from './userData/editCurrentUser';
import { watchGetOverview } from './getOverview';
import { watchGetNotifications } from './getNotifications';
import { watchGetBaseClient } from './baseClient/getBaseClient';
import { watchDeleteBaseClient } from './baseClient/deleteBaseClient';
import { watchAddNewBaseClient } from './baseClient/addNewBaseClient';

export function* rootSaga() {
  yield all([
    watchGetCurrentUser(),
    watchGetOverview(),
    watchEditCurrentUser(),
    watchGetNotifications(),
    watchGetBaseClient(),
    watchDeleteBaseClient(),
    watchAddNewBaseClient(),
  ]);
}
