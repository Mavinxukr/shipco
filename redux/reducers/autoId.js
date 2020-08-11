import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  autoIdData: null,
  isDataReceived: false,
  error: null,
};

export const autoId = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.autoId.request:
    case actionTypes.autoId.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.autoId.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        autoIdData: action.body,
      };

    case actionTypes.autoId.error:
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
