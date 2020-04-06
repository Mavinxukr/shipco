import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getClientPartsSuccess, getClientPartsError,
} from '../../actions/clientParts';
import { deleteClientPartsRequest } from '../../../services/clientParts';
import * as actionTypes from '../../actions/actionTypes';

const getClientParts = state => state.clientParts.clientPartsData;

function* deleteClientParts({ params, id }) {
  const response = yield call(deleteClientPartsRequest, params, id);
  const clientPartsData = yield select(getClientParts);
  if (response.status) {
    const data = { ...clientPartsData, data: clientPartsData.data.filter(item => item.id !== id) };
    yield put(getClientPartsSuccess(data));
  } else {
    yield put(getClientPartsError('error'));
  }
}

export function* watchDeleteClientParts() {
  yield takeLatest(actionTypes.clientParts.delete, deleteClientParts);
}
