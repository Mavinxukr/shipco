import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getNotificationsSuccess,
  getNotificationsError,
} from '../actions/notifications';
import { getNotificationsRequest } from '../../services/notifications';
import * as actionTypes from '../actions/actionTypes';

function* getNotifications({ params }) {
  const response = yield call(getNotificationsRequest, params);
  if (response.status) {
    yield put(getNotificationsSuccess(response.data.data));
  } else {
    yield put(getNotificationsError('error'));
  }
}

export function* watchGetNotifications() {
  yield takeLatest(actionTypes.notifications.request, getNotifications);
}
