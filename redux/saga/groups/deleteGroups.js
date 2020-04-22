import { call, put, takeLatest } from 'redux-saga/effects';
import { getGroupsSuccess, getGroupsError } from '../../actions/groups';
import { deleteGroupsRequest } from '../../../services/groups';
import * as actionTypes from '../../actions/actionTypes';

function* deleteGroups({ params, id }) {
  const response = yield call(deleteGroupsRequest, params, id);
  if (response.status) {
    yield put(getGroupsSuccess(response.data));
  } else {
    yield put(getGroupsError('error'));
  }
}

export function* watchDeleteGroups() {
  yield takeLatest(actionTypes.groups.delete, deleteGroups);
}
