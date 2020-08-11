import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  clientShippingData: null,
  isDataReceived: false,
  error: null,
};

export const clientShipping = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.clientShipping.request:
    case actionTypes.clientShipping.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.clientShipping.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        clientShippingData: action.body,
      };

    case actionTypes.clientShipping.error:
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
