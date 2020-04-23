import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  pricesData: null,
  isDataReceived: false,
  error: null,
};

export const prices = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.prices.request
      || actionTypes.prices.delete
      || actionTypes.prices.save
      || actionTypes.prices.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.prices.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        pricesData: action.body,
      };

    case actionTypes.prices.error:
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
