import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getClientDismantingSuccess,
  getClientDismantingError,
} from '../actions/clientDismanting';
import { addNoteRequest } from '../../services/clientDismanting';
import * as actionTypes from '../actions/actionTypes';

const getUpdateClientDismantingData = state => state.clientDismanting.clientDismantingData;

function* updateClientDismanting({ params, body }) {
  const response = yield call(addNoteRequest, params, body);
  const updateClientDismantingData = yield select(getUpdateClientDismantingData);
  if (response.status) {
    const newArr = updateClientDismantingData.data.map(item => item.id === body.auto_id ? response.data.data : item);
    yield put(
      getClientDismantingSuccess({
        data: newArr,
        links: updateClientDismantingData.links,
        additional: updateClientDismantingData.additional,
      }),
    );
  } else {
    yield put(getClientDismantingError('error'));
  }
}

export function* watchClientUpdateDismanting() {
  yield takeLatest(actionTypes.clientDismanting.update, updateClientDismanting);
}
