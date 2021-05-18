import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getClientPartsSuccess,
  getClientPartsError,
} from '../../actions/clientParts';
import { updateClientPartsRequest } from '../../../services/clientParts';
import * as actionTypes from '../../actions/actionTypes';

const getClientPartsData = state => state.clientParts.clientPartsData;

function* updateClientParts({ params, body, id }) {
  const response = yield call(updateClientPartsRequest, params, body, id);
  const clientPartsData = yield select(getClientPartsData);

  if (response.status) {
    const idx = clientPartsData.data.findIndex(item => item.id === id);
    const newArr = [...clientPartsData.data.slice(0, idx), response.data.data, ...clientPartsData.data.slice(idx + 1)];
    yield put(
      getClientPartsSuccess({
        data: newArr,
        links: clientPartsData.links,
        additional: response.data.additional,
      }),
    );
  } else {
    yield put(getClientPartsError('error'));
  }
}

export function* watchUpdateClientParts() {
  yield takeLatest(actionTypes.clientParts.update, updateClientParts);
}
