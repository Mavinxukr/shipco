import { call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import * as actionTypes from '../../actions/actionTypes';
import { getCurrentUserSuccess, getCurrentUserError } from '../../actions/currentUser';
import { logoutRequest, logoutAdminRequest } from '../../../services/user';


function* logout({ params, co, isUserLogOut }) {
  const isLogOut = isUserLogOut ? logoutRequest : logoutAdminRequest;
  const response = yield call(isLogOut, params);
  if (co) {
    co.remove('tokenShipco');
  } else {
    const cookies = new Cookies();
    cookies.remove('tokenShipco');
  }
  if (response.status) {
    yield put(getCurrentUserSuccess([]));
  } else {
    yield put(getCurrentUserError('error'));
  }
}

export function* watchLogout() {
  yield takeLatest(actionTypes.currentUser.delete, logout);
}
