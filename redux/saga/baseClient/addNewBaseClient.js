import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getBaseClientSuccess,
  getBaseClientError,
} from '../../actions/baseClient';
import { addNewBaseClientRequest } from '../../../services/baseClient';
import * as actionTypes from '../../actions/actionTypes';

function* addNewBaseClient({ params, body }) {
  const response = yield call(addNewBaseClientRequest, params, body);
  if (response.status) {
    yield put(getBaseClientSuccess(response.data));
  } else {
    yield put(getBaseClientError('error'));
  }
}

export function* watchAddNewBaseClient() {
  yield takeLatest(actionTypes.baseClient.save, addNewBaseClient);
}
