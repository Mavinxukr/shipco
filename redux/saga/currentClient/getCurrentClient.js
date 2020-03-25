import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCurrentClientSuccess,
  getCurrentClientError,
} from '../../actions/currentClient';
import { getClientById } from '../../../services/user';
import * as actionTypes from '../../actions/actionTypes';

function* getCurrentClient({ params, id }) {
  const response = yield call(getClientById, params, id);
  if (response.status) {
    yield put(getCurrentClientSuccess(response.data));
  } else {
    yield put(getCurrentClientError('error'));
  }
}

export function* watchGetCurrentClient() {
  yield takeLatest(actionTypes.currentClient.request, getCurrentClient);
}
