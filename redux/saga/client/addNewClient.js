import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  getClientSuccess,
  getClientError,
} from '../../actions/client';
import { addNewClientRequest } from '../../../services/client';
import * as actionTypes from '../../actions/actionTypes';

const getClientData = state => state.client.clientData;

function* addNewClient({ params, body }) {
  const response = yield call(addNewClientRequest, params, body);
  const clientData = yield select(getClientData);
  if (response.status) {
    yield put(getClientSuccess({
      data: [response.data.data, ...clientData.data],
      links: clientData.links,
    }));
  } else {
    yield put(getClientError('error'));
  }
}

export function* watchAddNewClient() {
  yield takeLatest(actionTypes.client.save, addNewClient);
}
