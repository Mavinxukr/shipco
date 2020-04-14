import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  autoByContainerData: null,
  isDataReceived: false,
  error: null,
};

export const autoByContainer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.autoByContainer.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.autoByContainer.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        autoByContainerData: action.body,
      };

    case actionTypes.autoByContainer.error:
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
