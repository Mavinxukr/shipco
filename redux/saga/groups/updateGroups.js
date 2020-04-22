import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  getGroupsSuccess,
  getGroupsError,
} from '../../actions/groups';
import { updateGroupsRequest } from '../../../services/groups';
import * as actionTypes from '../../actions/actionTypes';

const getGroupsData = state => state.groups.groupsData;

function* updateGroups({ params, body, id }) {
  const response = yield call(updateGroupsRequest, params, body, id);
  const groupsData = yield select(getGroupsData);
  if (response.status) {
    const idx = groupsData.data.findIndex(item => item.id === id);
    const newArr = [...groupsData.data.slice(0, idx), response.data.data, ...groupsData.data.slice(idx + 1)];
    yield put(
      getGroupsSuccess({
        data: newArr,
        links: groupsData.links,
        additional: groupsData.additional,
      }),
    );
  } else {
    yield put(getGroupsError('error'));
  }
}

export function* watchUpdateGroups() {
  yield takeLatest(actionTypes.groups.update, updateGroups);
}
