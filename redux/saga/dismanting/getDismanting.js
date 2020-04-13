import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getDismantingSuccess, getDismantingError,
} from '../../actions/dismanting';
import { getDismantingRequest } from '../../../services/dismanting';
import * as actionTypes from '../../actions/actionTypes';

function* getDismanting({ params }) {
  const response = yield call(getDismantingRequest, params);
  if (response.status) {
    yield put(getDismantingSuccess(response.data));
  } else {
    yield put(getDismantingError('error'));
  }
}

export function* watchDismanting() {
  yield takeLatest(actionTypes.dismanting.request, getDismanting);
}
