import * as actionTypes from './actionTypes';

export const parser = (params, body, table) => ({
  type: actionTypes.parser.save,
  params,
  body,
  table,
});

export const getParserSuccess = body => ({
  type: actionTypes.parser.success,
  body,
});

export const getParserError = error => ({
  type: actionTypes.parser.error,
  error,
});
