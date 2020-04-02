import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAutoClientSuccess, getAutoClientError,
} from '../actions/autoClient';
import { getAutoClientRequest } from '../../services/autoClient';
import * as actionTypes from '../actions/actionTypes';

function* getAutoClient({ params }) {
  const response = yield call(getAutoClientRequest, params);
  if (response.status) {
    yield put(getAutoClientSuccess(response.data));
  } else {
    yield put(getAutoClientError('error'));
  }
}

export function* watchAutoClient() {
  yield takeLatest(actionTypes.autoClient.request, getAutoClient);
}
