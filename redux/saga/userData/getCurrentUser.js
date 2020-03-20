import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCurrentUserSuccess,
  getCurrentUserError,
} from '../../actions/currentUser';
import { getCurrentUserRequest } from '../../../services/user';
import * as actionTypes from '../../actions/actionTypes';

function* getCurrentUser({ params }) {
  const response = yield call(getCurrentUserRequest, params);
  if (response.status) {
    yield put(getCurrentUserSuccess(response.data.data));
  } else {
    yield put(getCurrentUserError('error'));
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest(actionTypes.currentUser.request, getCurrentUser);
}
