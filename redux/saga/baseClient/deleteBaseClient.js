import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {
  getBaseClientSuccess,
  getBaseClientError,
} from '../../actions/baseClient';
import { deleteBaseClientRequest } from '../../../services/baseClient';
import * as actionTypes from '../../actions/actionTypes';

function* deleteBaseClient({ params, body }) {
  const response = yield call(deleteBaseClientRequest, params, body);
  if (response.status) {
    yield put(getBaseClientSuccess(response.data));
  } else {
    yield put(getBaseClientError('error'));
  }
}

export function* watchDeleteBaseClient() {
  yield takeLatest(actionTypes.baseClient.delete, deleteBaseClient);
}
