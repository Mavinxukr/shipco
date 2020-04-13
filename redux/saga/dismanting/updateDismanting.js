import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getDismantingSuccess,
  getDismantingError,
} from '../../actions/dismanting';
import { updateDismantingRequest } from '../../../services/dismanting';
import * as actionTypes from '../../actions/actionTypes';

const getUpdateDismantindData = state => state.dismanting.dismantingData;

function* updateDismanting({ params, body, id }) {
  const response = yield call(updateDismantingRequest, params, body, id);
  const updateDismantindData = yield select(getUpdateDismantindData);
  if (response.status) {
    const newArr = updateDismantindData.data.map(item => item.id === id ? response.data.data : item);
    yield put(getDismantingSuccess({
      data: newArr,
      links: updateDismantindData.links,
    }));
  } else {
    yield put(getDismantingError('error'));
  }
}

export function* watchUpdateDismanting() {
  yield takeLatest(actionTypes.dismanting.update, updateDismanting);
}
