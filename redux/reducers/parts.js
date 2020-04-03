import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  partsData: null,
  isDataReceived: false,
  error: null,
};

export const parts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.parts.request
      || actionTypes.parts.save
      || actionTypes.parts.delete:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.parts.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        partsData: action.body,
      };

    case actionTypes.parts.error:
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
