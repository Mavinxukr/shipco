import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  getBaseClientSuccess,
  getBaseClientError,
} from '../../actions/baseClient';
import { deleteBaseClientRequest } from '../../../services/baseClient';
import * as actionTypes from '../../actions/actionTypes';

const getBaseClientData = state => state.baseClient.baseClientData;

function* deleteBaseClient({ params, body }) {
  const response = yield call(deleteBaseClientRequest, params, body);
  const baseClientData = yield select(getBaseClientData);
  if (response.status) {
    const newArr = baseClientData.data.filter(item => body.client_id.every(itemChild => itemChild !== item.id));
    yield put(getBaseClientSuccess({ data: newArr, links: baseClientData.links }));
  } else {
    yield put(getBaseClientError('error'));
  }
}

export function* watchDeleteBaseClient() {
  yield takeLatest(actionTypes.baseClient.delete, deleteBaseClient);
}
