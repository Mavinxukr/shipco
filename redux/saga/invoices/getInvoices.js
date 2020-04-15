import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getInvoicesSuccess, getInvoicesError,
} from '../../actions/invoices';
import { getInvoicesRequest } from '../../../services/invoices';
import * as actionTypes from '../../actions/actionTypes';

function* getInvoices({ params }) {
  const response = yield call(getInvoicesRequest, params);
  if (response.status) {
    yield put(getInvoicesSuccess(response.data));
  } else {
    yield put(getInvoicesError('error'));
  }
}

export function* watchInvoices() {
  yield takeLatest(actionTypes.invoices.request, getInvoices);
}
