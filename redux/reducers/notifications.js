import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  notificationsData: null,
  isDataReceived: false,
  error: null,
};

export const notifications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.notifications.request:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.notifications.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        notificationsData: action.body,
      };

    case actionTypes.notifications.error:
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
