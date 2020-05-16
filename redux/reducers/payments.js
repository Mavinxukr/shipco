import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  paymentsData: null,
  isDataReceived: false,
  error: null,
};

export const payments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.payments.request
    || actionTypes.payments.delete
    || actionTypes.payments.save
    || actionTypes.payments.update:
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
