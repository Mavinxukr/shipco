import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getInvoicesSuccess, getInvoicesError } from '../../actions/invoices';
import { updateInvoicesRequest } from '../../../services/invoices';
import * as actionTypes from '../../actions/actionTypes';

const getInvoicesData = state => state.invoices.invoicesData;

function* updateInvoices({ params, body, id }) {
  const response = yield call(updateInvoicesRequest, params, body, id);
  const invoiceData = yield select(getInvoicesData);
  if (response.status) {
    const idx = invoiceData.data.findIndex(item => item.id === id);
    const newArr = [...invoiceData.data.slice(0, idx), response.data.data, ...invoiceData.data.slice(idx + 1)];
    yield put(getInvoicesSuccess({
      data: newArr,
      links: invoiceData.links,
      additional: invoiceData.additional,
    }));
  } else {
    yield put(getInvoicesError('error'));
  }
}

export function* watchUpdateInvoices() {
  yield takeLatest(actionTypes.invoices.update, updateInvoices);
}
