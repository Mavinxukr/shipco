import { call, put, takeLatest } from 'redux-saga/effects';
import { getAutoSuccess, getAutoError } from '../../actions/auto';
import { updateAutoRequest } from '../../../services/auto';
import * as actionTypes from '../../actions/actionTypes';

function* updateAutoById({ params, body, id }) {
  const response = yield call(updateAutoRequest, params, body, id);
  if (response.status) {
    yield put(getAutoSuccess(response.data));
  } else {
    yield put(getAutoError('error'));
  }
}

export function* watchUpdateAuto() {
  yield takeLatest(actionTypes.auto.update, updateAutoById);
}
