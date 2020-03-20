import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  overviewData: null,
  isDataReceived: false,
  error: null,
};

export const overview = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.overview.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.overview.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        overviewData: action.body,
      };

    case actionTypes.overview.error:
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
