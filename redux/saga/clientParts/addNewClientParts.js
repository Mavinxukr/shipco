import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {
  getClientPartsSuccess,
  getClientPartsError,
} from '../../actions/clientParts';
import { addNewClientPartsRequest } from '../../../services/clientParts';
import * as actionTypes from '../../actions/actionTypes';

function* addNewClientParts({ params, body }) {
  const response = yield call(addNewClientPartsRequest, params, body);
  if (response.status) {
    yield put(getClientPartsSuccess(response.data));
  } else {
    yield put(getClientPartsError('error'));
  }
}

export function* watchAddNewClientParts() {
  yield takeLatest(actionTypes.clientParts.save, addNewClientParts);
}
