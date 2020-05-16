import { call, put, takeLatest } from 'redux-saga/effects';
import { getPaymentsSuccess, getPaymentsError } from '../../actions/payments';
import { getPaymentsRequest } from '../../../services/payments';
import * as actionTypes from '../../actions/actionTypes';

function* getPayments({ params, id }) {
  const response = yield call(getPaymentsRequest, params, id);
  if (response.status) {
    yield put(getPaymentsSuccess(response.data));
  } else {
    yield put(getPaymentsError('error'));
  }
}

export function* watchGetPayments() {
  yield takeLatest(actionTypes.payments.request, getPayments);
}
