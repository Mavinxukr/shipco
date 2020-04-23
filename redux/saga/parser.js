import { call, put, takeLatest } from 'redux-saga/effects';
import { getParserSuccess, getParserError } from '../actions/parser';
import { parserRequest } from '../../services/parser';
import * as actionTypes from '../actions/actionTypes';

function* getParser({ params, body, table }) {
  const response = yield call(parserRequest, params, body, table);
  if (response.status) {
    yield put(getParserSuccess(response.data));
  } else {
    yield put(getParserError('error'));
  }
}

export function* watchParser() {
  yield takeLatest(actionTypes.parser.save, getParser);
}
