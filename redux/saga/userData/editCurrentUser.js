import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCurrentUserSuccess,
  getCurrentUserError,
} from '../../actions/currentUser';
import { editCurrentUserRequest } from '../../../services/user';
import * as actionTypes from '../../actions/actionTypes';

function* editCurrentUser({ params, body }) {
  const response = yield call(editCurrentUserRequest, params, body);
  if (response.status) {
    yield put(getCurrentUserSuccess(response.data.data));
  } else {
    yield put(getCurrentUserError('error'));
  }
}

export function* watchEditCurrentUser() {
  yield takeLatest(actionTypes.currentUser.update, editCurrentUser);
}
