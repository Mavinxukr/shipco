import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getPartsSuccess,
  getPartsError,
} from '../../actions/parts';
import { updatePartsRequest } from '../../../services/parts';
import * as actionTypes from '../../actions/actionTypes';

const getPartsData = state => state.parts.partsData;

function* updateParts({ params, body, id }) {

  const response = yield call(updatePartsRequest, params, body, id);
  const partsData = yield select(getPartsData);
  if (response.status) {
    const idx = partsData.data.findIndex(item => item.id === id);
    const newArr = [...partsData.data.slice(0, idx), response.data.data, ...partsData.data.slice(idx + 1)];
    yield put(
      getPartsSuccess({
        data: newArr,
        links: partsData.links,
        additional: response.data.additional,
      }),
    );
  } else {
    yield put(getPartsError({error: response.message}));
  }
}

export function* watchUpdateParts() {
  yield takeLatest(actionTypes.parts.update, updateParts);
}
