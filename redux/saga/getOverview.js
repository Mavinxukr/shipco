import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getOverviewSuccess,
  getOverviewError,
} from '../actions/overview';
import { getOverviewRequest } from '../../services/overview';
import * as actionTypes from '../actions/actionTypes';

function* getOverview({ params }) {
  const response = yield call(getOverviewRequest, params);
  if (response.status) {
    yield put(getOverviewSuccess(response.data.data));
  } else {
    yield put(getOverviewError('error'));
  }
}

export function* watchGetOverview() {
  yield takeLatest(actionTypes.overview.request, getOverview);
}
