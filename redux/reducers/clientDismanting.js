import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  clientDismantingData: null,
  isDataReceived: false,
  error: null,
};

export const clientDismanting = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.clientDismanting.request
      || actionTypes.clientDismanting.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.clientDismanting.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        clientDismantingData: action.body,
      };

    case actionTypes.clientDismanting.error:
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
