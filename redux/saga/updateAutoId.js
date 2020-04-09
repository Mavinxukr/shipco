import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getAutoIdSuccess, getAutoIdError } from '../actions/autoId';
import { updateAutoIdRequest } from '../../services/autoId';
import * as actionTypes from '../actions/actionTypes';

const getUpdateAutoIdData = state => state.autoId.autoIdData;

function* getUpdateAutoId({ params, body }) {
  const response = yield call(updateAutoIdRequest, params, body);
  const updateAutoIdData = yield select(getUpdateAutoIdData);
  if (response.status) {
    yield put(
      getAutoIdSuccess({
        ...updateAutoIdData,
        vehicles: updateAutoIdData.vehicles,
        notes: response.data.data.notes,
      }),
    );
  } else {
    yield put(getAutoIdError('error'));
  }
}

export function* watchUpdateAutoId() {
  yield takeLatest(actionTypes.autoId.update, getUpdateAutoId);
}
