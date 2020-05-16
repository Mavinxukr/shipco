import { call, put, takeLatest } from 'redux-saga/effects';
import { getPaymentsSuccess, getPaymentsError } from '../../actions/payments';
import { deletePaymentsRequest } from '../../../services/payments';
import * as actionTypes from '../../actions/actionTypes';

function* deletePaymants({ params, id }) {
  const response = yield call(deletePaymentsRequest, params, id);
  if (response.status) {
    yield put(getPaymentsSuccess(response.data));
  } else {
    yield put(getPaymentsError('error'));
  }
}

export function* watchDeletePaymants() {
  yield takeLatest(actionTypes.payments.delete, deletePaymants);
}
