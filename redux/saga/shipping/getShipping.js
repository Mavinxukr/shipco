import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getShippingSuccess, getShippingError,
} from '../../actions/shipping';
import { getShippingRequest } from '../../../services/shipping';
import * as actionTypes from '../../actions/actionTypes';

function* getShipping({ params }) {
  const response = yield call(getShippingRequest, params);
  if (response.status) {
    yield put(getShippingSuccess(response.data));
  } else {
    yield put(getShippingError('error'));
  }
}

export function* watchShipping() {
  yield takeLatest(actionTypes.shipping.request, getShipping);
}
