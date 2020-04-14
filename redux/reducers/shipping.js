import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  shippingData: null,
  isDataReceived: false,
  error: null,
};

export const shipping = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.shipping.request
      || actionTypes.shipping.update
      || actionTypes.shipping.save:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.shipping.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        shippingData: action.body,
      };

    case actionTypes.shipping.error:
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
