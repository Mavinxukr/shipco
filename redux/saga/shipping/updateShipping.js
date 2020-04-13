import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { getShippingSuccess, getShippingError } from '../../actions/shipping';
import {
  updateShippingRequest,
  addNoteRequest,
} from '../../../services/shipping';
import * as actionTypes from '../../actions/actionTypes';

const getUpdateShippingData = state => state.shipping.shippingData;

function* updateShipping({
  params, body, id, isNote,
}) {
  const func = isNote ? addNoteRequest : updateShippingRequest;
  const response = yield call(func, params, body, id, isNote);
  const updateShippingData = yield select(getUpdateShippingData);
  if (response.status) {
    const newArr = updateShippingData.data.map(item => item.id === body.auto_id ? response.data.data : item);

    yield put(
      getShippingSuccess({
        data: newArr,
        links: updateShippingData.links,
      }),
    );
  } else {
    yield put(getShippingError('error'));
  }
}

export function* watchUpdateShipping() {
  yield takeLatest(actionTypes.shipping.update, updateShipping);
}
