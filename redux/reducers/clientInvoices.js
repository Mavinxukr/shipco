import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  clientInvoicesData: null,
  isDataReceived: false,
  error: null,
};

export const clientInvoices = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.clientInvoices.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.clientInvoices.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        clientInvoicesData: action.body,
      };

    case actionTypes.clientInvoices.error:
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
