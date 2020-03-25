import { call, put, takeLatest } from 'redux-saga/effects';
import { getAutoSuccess, getAutoError } from '../../actions/auto';
import { getAutoRequest } from '../../../services/auto';
import * as actionTypes from '../../actions/actionTypes';

function* getAutoById({ params, id }) {
  const response = yield call(getAutoRequest, params, id);
  if (response.status) {
    yield put(getAutoSuccess(response.data));
  } else {
    yield put(getAutoError('error'));
  }
}

export function* watchGetAuto() {
  yield takeLatest(actionTypes.auto.request, getAutoById);
}
