import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {
  getClientSuccess,
  getClientError,
} from '../../actions/client';
import { deleteClientRequest } from '../../../services/client';
import * as actionTypes from '../../actions/actionTypes';

function* deleteClient({ params, body }) {
  const response = yield call(deleteClientRequest, params, body);
  if (response.status) {
    yield put(getClientSuccess(response.data));
  } else {
    yield put(getClientError('error'));
  }
}

export function* watchDeleteClient() {
  yield takeLatest(actionTypes.client.delete, deleteClient);
}
