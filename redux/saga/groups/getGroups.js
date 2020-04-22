import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getGroupsSuccess,
  getGroupsError,
} from '../../actions/groups';
import { getGroupsRequest } from '../../../services/groups';
import * as actionTypes from '../../actions/actionTypes';

function* getGroups({ params }) {
  const response = yield call(getGroupsRequest, params);
  if (response.status) {
    yield put(getGroupsSuccess(response.data));
  } else {
    yield put(getGroupsError('error'));
  }
}

export function* watchGetGroups() {
  yield takeLatest(actionTypes.groups.request, getGroups);
}
