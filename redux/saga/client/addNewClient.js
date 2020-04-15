import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {
  getClientSuccess,
  getClientError,
} from '../../actions/client';
import { addNewClientRequest } from '../../../services/client';
import * as actionTypes from '../../actions/actionTypes';

function* addNewClient({ params, body }) {
  const response = yield call(addNewClientRequest, params, body);
  if (response.status) {
    yield put(getClientSuccess(response.data));
  } else {
    yield put(getClientError('error'));
  }
}

export function* watchAddNewClient() {
  yield takeLatest(actionTypes.client.save, addNewClient);
}
