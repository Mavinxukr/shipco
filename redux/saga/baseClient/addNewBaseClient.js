import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  getBaseClientSuccess,
  getBaseClientError,
} from '../../actions/baseClient';
import { addNewBaseClientRequest } from '../../../services/baseClient';
import * as actionTypes from '../../actions/actionTypes';

const getBaseClientData = state => state.baseClient.baseClientData;

function* addNewBaseClient({ params, body }) {
  const response = yield call(addNewBaseClientRequest, params, body);
  const baseClientData = yield select(getBaseClientData);
  if (response.status) {
    yield put(getBaseClientSuccess({
      data: [response.data.data, ...baseClientData.data],
      links: baseClientData.links,
    }));
  } else {
    yield put(getBaseClientError('error'));
  }
}

export function* watchAddNewBaseClient() {
  yield takeLatest(actionTypes.baseClient.save, addNewBaseClient);
}
