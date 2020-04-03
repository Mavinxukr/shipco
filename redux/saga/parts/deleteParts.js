import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getPartsSuccess, getPartsError,
} from '../../actions/parts';
import { deletePartsRequest } from '../../../services/parts';
import * as actionTypes from '../../actions/actionTypes';

const getParts = state => state.parts.partsData;

function* deleteParts({ params, id }) {
  const response = yield call(deletePartsRequest, params, id);
  const partsData = yield select(getParts);
  if (response.status) {
    const data = { ...partsData, data: partsData.data.filter(item => item.id !== id) };
    yield put(getPartsSuccess(data));
  } else {
    yield put(getPartsError('error'));
  }
}

export function* watchDeleteParts() {
  yield takeLatest(actionTypes.parts.delete, deleteParts);
}
