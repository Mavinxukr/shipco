import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  clientPartsData: null,
  isDataReceived: false,
  error: null,
};

export const clientParts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.clientParts.request
    || actionTypes.clientParts.save
    || actionTypes.clientParts.delete:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.clientParts.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        clientPartsData: action.body,
      };

    case actionTypes.clientParts.error:
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
