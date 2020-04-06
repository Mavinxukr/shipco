import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  getPartsSuccess,
  getPartsError,
} from '../../actions/parts';
import { addNewPartsRequest } from '../../../services/parts';
import * as actionTypes from '../../actions/actionTypes';

const getPartsData = state => state.parts.partsData;

function* addNewParts({ params, body }) {
  const response = yield call(addNewPartsRequest, params, body);
  const partsData = yield select(getPartsData);
  if (response.status) {
    yield put(getPartsSuccess({
      data: [response.data.data, ...partsData.data],
      links: partsData.links,
      additional: response.data.additional,
    }));
  } else {
    yield put(getPartsError('error'));
  }
}

export function* watchAddNewParts() {
  yield takeLatest(actionTypes.parts.save, addNewParts);
}
