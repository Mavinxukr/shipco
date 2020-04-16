import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getDismantingSuccess,
  getDismantingError,
} from '../../actions/dismanting';
import {
  updateDismantingRequest,
  addNoteRequest,
} from '../../../services/dismanting';
import * as actionTypes from '../../actions/actionTypes';

const getUpdateDismantindData = state => state.dismanting.dismantingData;

function* updateDismanting({
  params, body, id, isNote,
}) {
  const func = isNote ? addNoteRequest : updateDismantingRequest;
  const response = yield call(func, params, body, id, isNote);
  const updateDismantindData = yield select(getUpdateDismantindData);
  if (response.status) {
    if (isNote) {
      const newArr = updateDismantindData.data.map(item => item.id === id ? response.data.data : item);
      yield put(
        getDismantingSuccess({
          data: newArr,
          links: updateDismantindData.links,
          additional: updateDismantindData.additional,
        }),
      );
    } else {
      yield put(getDismantingSuccess(response.data));
    }
  } else {
    yield put(getDismantingError('error'));
  }
}

export function* watchUpdateDismanting() {
  yield takeLatest(actionTypes.dismanting.update, updateDismanting);
}
