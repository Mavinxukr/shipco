import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getClientShippingSuccess,
  getClientShippingError,
} from '../../actions/clientShipping';
import { addNoteRequest } from '../../../services/clientShipping';
import * as actionTypes from '../../actions/actionTypes';

const getUpdateClientShippingData = state => state.clientShipping.clientShippingData;

function* updateClientShipping({ params, body }) {
  const response = yield call(addNoteRequest, params, body);
  const updateClientShippingData = yield select(getUpdateClientShippingData);
  if (response.status) {
    const newArr = updateClientShippingData.data.map(item => item.id === body.auto_id ? response.data.data : item);
    yield put(
      getClientShippingSuccess({
        data: newArr,
        links: updateClientShippingData.links,
      }),
    );
  } else {
    yield put(getClientShippingError('error'));
  }
}

export function* watchClientUpdateShipping() {
  yield takeLatest(actionTypes.clientShipping.update, updateClientShipping);
}
