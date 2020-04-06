import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getClientPartsSuccess, getClientPartsError,
} from '../../actions/clientParts';
import { getClientPartsRequest } from '../../../services/clientParts';
import * as actionTypes from '../../actions/actionTypes';

function* getClientParts({ params }) {
  const response = yield call(getClientPartsRequest, params);
  if (response.status) {
    yield put(getClientPartsSuccess(response.data));
  } else {
    yield put(getClientPartsError('error'));
  }
}

export function* watchClientParts() {
  yield takeLatest(actionTypes.clientParts.request, getClientParts);
}
