import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getPartsSuccess, getPartsError,
} from '../../actions/parts';
import { getPartsRequest } from '../../../services/parts';
import * as actionTypes from '../../actions/actionTypes';

function* getParts({ params }) {
  const response = yield call(getPartsRequest, params);
  if (response.status) {
    yield put(getPartsSuccess(response.data));
  } else {
    yield put(getPartsError('error'));
  }
}

export function* watchParts() {
  yield takeLatest(actionTypes.parts.request, getParts);
}
