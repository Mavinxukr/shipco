import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {
  getPartsSuccess,
  getPartsError,
} from '../../actions/parts';
import { addNewPartsRequest } from '../../../services/parts';
import * as actionTypes from '../../actions/actionTypes';

function* addNewParts({ params, body }) {
  const response = yield call(addNewPartsRequest, params, body);
  if (response.status) {
    yield put(getPartsSuccess(response.data));
  } else {
    yield put(getPartsError('error'));
  }
}

export function* watchAddNewParts() {
  yield takeLatest(actionTypes.parts.save, addNewParts);
}
