import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  parserData: null,
  isDataReceived: false,
  error: null,
};

export const parser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.parser.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.parser.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        parserData: action.body,
      };

    case actionTypes.parser.error:
      return {
        ...state,
        isFetch: false,
        isDataReceived: false,
        error: action.error,
      };

    default:
      return state;
  }
};
