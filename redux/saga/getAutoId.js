import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAutoIdSuccess, getAutoIdError,
} from '../actions/autoId';
import { getAutoIdRequest } from '../../services/autoId';
import * as actionTypes from '../actions/actionTypes';

function* getAutoId({ params, id }) {
  const response = yield call(getAutoIdRequest, params, id);
  if (response.status) {
    yield put(getAutoIdSuccess(response.data.data));
  } else {
    yield put(getAutoIdError('error'));
  }
}

export function* watchAutoId() {
  yield takeLatest(actionTypes.autoId.request, getAutoId);
}
