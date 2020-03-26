import { call, put, takeLatest } from 'redux-saga/effects';
import { getAutoSuccess, getAutoError } from '../../actions/auto';
import { deleteAutoDocumentRequest } from '../../../services/auto';
import * as actionTypes from '../../actions/actionTypes';

function* deleteAutoDocumentById({ params, body, id }) {
  const response = yield call(deleteAutoDocumentRequest, params, body, id);
  if (response.status) {
    yield put(getAutoSuccess(response.data));
  } else {
    yield put(getAutoError('error'));
  }
}

export function* watchDeleteAutoDocument() {
  yield takeLatest(actionTypes.auto.delete, deleteAutoDocumentById);
}
