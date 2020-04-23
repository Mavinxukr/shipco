import { call, put, takeLatest } from 'redux-saga/effects';
import { getPricesSuccess, getPricesError } from '../../actions/prices';
import { addPricesRequest } from '../../../services/prices';
import * as actionTypes from '../../actions/actionTypes';

function* addPrices({ params, body }) {
  const response = yield call(addPricesRequest, params, body);
  if (response.status) {
    yield put(getPricesSuccess(response.data));
  } else {
    yield put(getPricesError('error'));
  }
}

export function* watchAddPrices() {
  yield takeLatest(actionTypes.prices.save, addPrices);
}
