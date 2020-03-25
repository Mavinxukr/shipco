import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  getClientSuccess,
  getClientError,
} from '../../actions/client';
import { deleteClientRequest } from '../../../services/client';
import * as actionTypes from '../../actions/actionTypes';

const getClientData = state => state.client.clientData;

function* deleteClient({ params, body }) {
  const response = yield call(deleteClientRequest, params, body);
  const clientData = yield select(getClientData);
  if (response.status) {
    const newArr = clientData.data.filter(item => body.auto_id.every(itemChild => itemChild !== item.id));
    yield put(getClientSuccess({ data: newArr, links: clientData.links }));
  } else {
    yield put(getClientError('error'));
  }
}

export function* watchDeleteClient() {
  yield takeLatest(actionTypes.client.delete, deleteClient);
}
