import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  baseClientData: null,
  isDataReceived: false,
  error: null,
};

export const baseClient = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.baseClient.request
      || actionTypes.baseClient.delete
      || actionTypes.baseClient.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.baseClient.success:
      return {
        error: null,
        isFetch: false,
        isDataReceived: true,
        baseClientData: action.body,
      };

    case actionTypes.baseClient.error:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        error: action.error,
      };

    default:
      return state;
  }
};
