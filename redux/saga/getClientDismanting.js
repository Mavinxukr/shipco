import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getClientDismantingSuccess,
  getClientDismantingError,
} from '../actions/clientDismanting';
import { getClientDismantingRequest } from '../../services/clientDismanting';
import * as actionTypes from '../actions/actionTypes';

function* getClientDismanting({ params }) {
  const response = yield call(getClientDismantingRequest, params);
  if (response.status) {
    yield put(getClientDismantingSuccess(response.data));
  } else {
    yield put(getClientDismantingError('error'));
  }
}

export function* watchClientDismanting() {
  yield takeLatest(actionTypes.clientDismanting.request, getClientDismanting);
}
