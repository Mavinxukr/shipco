import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getClientShippingSuccess,
  getClientShippingError,
} from '../../actions/clientShipping';
import { getClientShippingRequest } from '../../../services/clientShipping';
import * as actionTypes from '../../actions/actionTypes';

function* getClientShipping({ params }) {
  const response = yield call(getClientShippingRequest, params);
  if (response.status) {
    yield put(getClientShippingSuccess(response.data));
  } else {
    yield put(getClientShippingError('error'));
  }
}

export function* watchClientShipping() {
  yield takeLatest(actionTypes.clientShipping.request, getClientShipping);
}
