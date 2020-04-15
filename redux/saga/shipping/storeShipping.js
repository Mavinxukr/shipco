import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getShippingSuccess, getShippingError } from '../../actions/shipping';
import { storeShippingRequest } from '../../../services/shipping';
import * as actionTypes from '../../actions/actionTypes';

function* storeShipping({ params, body }) {
  const response = yield call(storeShippingRequest, params, body);
  if (response.status) {
    yield put(
      getShippingSuccess(response.data),
    );
  } else {
    yield put(getShippingError('error'));
  }
}

export function* watchStoreShipping() {
  yield takeLatest(actionTypes.shipping.save, storeShipping);
}
