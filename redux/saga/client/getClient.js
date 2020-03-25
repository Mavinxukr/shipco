import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getClientSuccess,
  getClientError,
} from '../../actions/client';
import { getClientRequest } from '../../../services/client';
import * as actionTypes from '../../actions/actionTypes';

function* getClient({ params }) {
  const response = yield call(getClientRequest, params);
  if (response.status) {
    yield put(getClientSuccess(response.data));
  } else {
    yield put(getClientError('error'));
  }
}

export function* watchGetClient() {
  yield takeLatest(actionTypes.client.request, getClient);
}
