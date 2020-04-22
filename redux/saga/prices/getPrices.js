import { call, put, takeLatest } from 'redux-saga/effects';
import { getPricesSuccess, getPricesError } from '../../actions/prices';
import { getPricesRequest } from '../../../services/prices';
import * as actionTypes from '../../actions/actionTypes';

function* getPrices({ params }) {
  const response = yield call(getPricesRequest, params);
  if (response.status) {
    yield put(getPricesSuccess(response.data));
  } else {
    yield put(getPricesError('error'));
  }
}

export function* watchGetPrices() {
  yield takeLatest(actionTypes.prices.request, getPrices);
}
