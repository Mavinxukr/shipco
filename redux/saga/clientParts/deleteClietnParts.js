import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getClientPartsSuccess,
  getClientPartsError,
} from '../../actions/clientParts';
import { deleteClientPartsRequest } from '../../../services/clientParts';
import * as actionTypes from '../../actions/actionTypes';

function* deleteClientParts({ params, id }) {
  const response = yield call(deleteClientPartsRequest, params, id);
  if (response.status) {
    yield put(getClientPartsSuccess(response.data));
  } else {
    yield put(getClientPartsError('error'));
  }
}

export function* watchDeleteClientParts() {
  yield takeLatest(actionTypes.clientParts.delete, deleteClientParts);
}
