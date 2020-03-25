import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCurrentClientSuccess,
  getCurrentClientError,
} from '../../actions/currentClient';
import { updateClientById } from '../../../services/user';
import * as actionTypes from '../../actions/actionTypes';

function* updateCurrentClient({ params, body, id }) {
  const response = yield call(updateClientById, params, body, id);
  if (response.status) {
    yield put(getCurrentClientSuccess(response.data));
  } else {
    yield put(getCurrentClientError('error'));
  }
}

export function* watchUpdateCurrentClient() {
  yield takeLatest(actionTypes.currentClient.update, updateCurrentClient);
}
