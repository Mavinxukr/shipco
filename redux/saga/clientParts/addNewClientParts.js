import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  getClientPartsSuccess,
  getClientPartsError,
} from '../../actions/clientParts';
import { addNewClientPartsRequest } from '../../../services/clientParts';
import * as actionTypes from '../../actions/actionTypes';

const getClientPartsData = state => state.clientParts.clientPartsData;

function* addNewClientParts({ params, body }) {
  const response = yield call(addNewClientPartsRequest, params, body);
  const clientPartsData = yield select(getClientPartsData);
  if (response.status) {
    yield put(getClientPartsSuccess({
      data: [response.data.data, ...clientPartsData.data],
      links: clientPartsData.links,
      additional: response.data.additional,
    }));
  } else {
    yield put(getClientPartsError('error'));
  }
}

export function* watchAddNewClientParts() {
  yield takeLatest(actionTypes.clientParts.save, addNewClientParts);
}
