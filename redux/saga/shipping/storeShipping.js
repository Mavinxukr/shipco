import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getShippingSuccess, getShippingError } from '../../actions/shipping';
import { storeShippingRequest } from '../../../services/shipping';
import * as actionTypes from '../../actions/actionTypes';

const storeShippingData = state => state.shipping.shippingData;

function* storeShipping({ params, body }) {
  const response = yield call(storeShippingRequest, params, body);
  const addStoreShipping = yield select(storeShippingData);
  if (response.status) {
    yield put(
      getShippingSuccess({
        data: [...response.data.data, ...addStoreShipping.data],
        links: addStoreShipping.links,
      }),
    );
  } else {
    yield put(getShippingError('error'));
  }
}

export function* watchStoreShipping() {
  yield takeLatest(actionTypes.shipping.save, storeShipping);
}
