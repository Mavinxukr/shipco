import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getClientInvoicesSuccess,
  getClientInvoicesError,
} from '../actions/clientInvoices';
import { getClientInvoicesRequest } from '../../services/clientInvoices';
import * as actionTypes from '../actions/actionTypes';

function* getClientInvoices({ params }) {
  const response = yield call(getClientInvoicesRequest, params);
  if (response.status) {
    yield put(getClientInvoicesSuccess(response.data));
  } else {
    yield put(getClientInvoicesError('error'));
  }
}

export function* watchClientInvoices() {
  yield takeLatest(actionTypes.clientInvoices.request, getClientInvoices);
}
