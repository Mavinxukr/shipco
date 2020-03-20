import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getBaseClientSuccess,
  getBaseClientError,
} from '../../actions/baseClient';
import { getBaseClientRequest } from '../../../services/baseClient';
import * as actionTypes from '../../actions/actionTypes';

function* getBaseClient({ params }) {
  const response = yield call(getBaseClientRequest, params);
  if (response.status) {
    yield put(getBaseClientSuccess(response.data));
  } else {
    yield put(getBaseClientError('error'));
  }
}

export function* watchGetBaseClient() {
  yield takeLatest(actionTypes.baseClient.request, getBaseClient);
}
