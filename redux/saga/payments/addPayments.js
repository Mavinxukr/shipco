import { call, put, takeLatest } from 'redux-saga/effects';
import { getPaymentsSuccess, getPaymentsError } from '../../actions/payments';
import { addPaymentsRequest } from '../../../services/payments';
import * as actionTypes from '../../actions/actionTypes';

function* addPayments({ params, body }) {
  const response = yield call(addPaymentsRequest, params, body);
  if (response.status) {
    yield put(getPaymentsSuccess(response.data));
  } else {
    yield put(getPaymentsError('error'));
  }
}

export function* watchAddPayments() {
  yield takeLatest(actionTypes.payments.save, addPayments);
}
