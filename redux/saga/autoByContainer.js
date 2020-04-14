import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAutoByContainerSuccess, getAutoByContainerError,
} from '../actions/autosByContainer';
import { getAutoByContainerRequest } from '../../services/autoByContainer';
import * as actionTypes from '../actions/actionTypes';

function* getAutoByContainer({ params }) {
  const response = yield call(getAutoByContainerRequest, params);
  if (response.status) {
    yield put(getAutoByContainerSuccess(response.data));
  } else {
    yield put(getAutoByContainerError('error'));
  }
}

export function* watchautoByContainer() {
  yield takeLatest(actionTypes.autoByContainer.request, getAutoByContainer);
}
