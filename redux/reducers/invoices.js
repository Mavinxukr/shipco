import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  invoicesData: null,
  isDataReceived: false,
  error: null,
};

export const invoices = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.invoices.request:
    case actionTypes.invoices.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.invoices.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        invoicesData: action.body,
      };

    case actionTypes.invoices.error:
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
