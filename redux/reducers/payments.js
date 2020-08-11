import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  paymentsData: null,
  isDataReceived: false,
  error: null,
};

export const payments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.payments.request:
    case actionTypes.payments.delete:
    case actionTypes.payments.save:
    case actionTypes.payments.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.payments.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        paymentsData: action.body,
      };

    case actionTypes.payments.error:
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
