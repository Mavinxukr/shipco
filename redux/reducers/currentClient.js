import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  currentClient: null,
  isDataReceived: false,
  error: null,
};

export const currentClient = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.currentClient.request:
    case actionTypes.currentClient.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.currentClient.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        currentClient: action.body,
      };

    case actionTypes.currentClient.error:
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
