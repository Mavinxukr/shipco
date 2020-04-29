import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getPartsSuccess, getPartsError } from '../../actions/parts';
import {
  deletePartsRequest,
  deletePartsImageRequest,
} from '../../../services/parts';
import * as actionTypes from '../../actions/actionTypes';

const getParts = state => state.parts.partsData;

function* deleteParts({
  params, body, id, isImage,
}) {
  const func = isImage ? deletePartsImageRequest : deletePartsRequest;
  const response = yield call(func, body, params, id);
  const partsData = yield select(getParts);
  if (response.status) {
    if (isImage) {
      const data = {
        ...partsData,
        data: partsData.data.map(item => item.id === id ? response.data.data : item),
      };
      yield put(getPartsSuccess(data));
    } else {
      yield put(getPartsSuccess(response.data));
    }
  } else {
    yield put(getPartsError('error'));
  }
}

export function* watchDeleteParts() {
  yield takeLatest(actionTypes.parts.delete, deleteParts);
}
