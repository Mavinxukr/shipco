import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  autoClientData: null,
  isDataReceived: false,
  error: null,
};

export const autoClient = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.autoClient.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.autoClient.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        autoClientData: action.body,
      };

    case actionTypes.autoClient.error:
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
