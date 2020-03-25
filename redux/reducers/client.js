import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  clientData: null,
  isDataReceived: false,
  error: null,
};

export const client = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.client.request
    || actionTypes.client.delete:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.client.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        clientData: action.body,
      };

    case actionTypes.client.error:
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
