import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getPricesSuccess, getPricesError } from '../../actions/prices';
import { updatePricesRequest } from '../../../services/prices';
import * as actionTypes from '../../actions/actionTypes';

const getPricesData = state => state.prices.pricesData;

function* updatePrices({ params, body, id }) {
  const response = yield call(updatePricesRequest, params, body, id);
  const pricesData = yield select(getPricesData);
  if (response.status) {
    let newArr = [];
    if (Array.isArray(pricesData.data)) {
      const idx = pricesData.data.findIndex(item => item.id === id);
      newArr = [
        ...pricesData.data.slice(0, idx),
        response.data.data,
        ...pricesData.data.slice(idx + 1),
      ];
    }
    yield put(
      getPricesSuccess({
        data: (Array.isArray(pricesData.data) && newArr) || response.data.data,
        links: pricesData.links,
        additional: pricesData.additional,
      }),
    );
  } else {
    yield put(getPricesError('error'));
  }
}

export function* watchUpdatePrices() {
  yield takeLatest(actionTypes.prices.update, updatePrices);
}
