import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  autoData: null,
  isDataReceived: false,
  error: null,
};

export const auto = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.auto.request:
    case actionTypes.auto.update:
    case actionTypes.auto.delete:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.auto.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        autoData: action.body,
      };

    case actionTypes.auto.error:
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
