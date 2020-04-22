import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {
  getGroupsSuccess,
  getGroupsError,
} from '../../actions/groups';
import { addGroupsRequest } from '../../../services/groups';
import * as actionTypes from '../../actions/actionTypes';

function* addGroups({ params, body }) {
  const response = yield call(addGroupsRequest, params, body);
  if (response.status) {
    yield put(getGroupsSuccess(response.data));
  } else {
    yield put(getGroupsError('error'));
  }
}

export function* watchAddGroups() {
  yield takeLatest(actionTypes.groups.save, addGroups);
}
