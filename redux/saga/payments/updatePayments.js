import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getPaymentsSuccess, getPaymentsError } from '../../actions/payments';
import { updatePaymentsRequest } from '../../../services/payments';
import * as actionTypes from '../../actions/actionTypes';

const getPaymentsData = state => state.payments.paymentsData;

function* updatePayments({ params, body, id }) {
  const response = yield call(updatePaymentsRequest, params, body, id);
  const paymentsData = yield select(getPaymentsData);
  if (response.status) {
    let newArr = [];
    if (Array.isArray(paymentsData.data)) {
      const idx = paymentsData.data.findIndex(item => item.id === id);
      newArr = [
        ...paymentsData.data.slice(0, idx),
        response.data.data,
        ...paymentsData.data.slice(idx + 1),
      ];
    }
    yield put(
      getPaymentsSuccess({
        data: (Array.isArray(paymentsData.data) && newArr) || response.data.data,
        links: paymentsData.links,
        additional: paymentsData.additional,
      }),
    );
  } else {
    yield put(getPaymentsError('error'));
  }
}

export function* watchUpdatePayments() {
  yield takeLatest(actionTypes.payments.update, updatePayments);
}
