import { call, put, takeLatest } from 'redux-saga/effects';
import { getPricesSuccess, getPricesError } from '../../actions/prices';
import { deletePricesRequest } from '../../../services/prices';
import * as actionTypes from '../../actions/actionTypes';

function* deletePrices({ params, id }) {
  const response = yield call(deletePricesRequest, params, id);
  if (response.status) {
    yield put(getPricesSuccess(response.data));
  } else {
    yield put(getPricesError('error'));
  }
}

export function* watchDeletePrices() {
  yield takeLatest(actionTypes.prices.delete, deletePrices);
}
