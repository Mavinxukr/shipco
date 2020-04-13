import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  dismantingData: null,
  isDataReceived: false,
  error: null,
};

export const dismanting = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.dismanting.request || actionTypes.dismanting.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.dismanting.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        dismantingData: action.body,
      };

    case actionTypes.dismanting.error:
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
