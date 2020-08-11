import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  groupsData: null,
  isDataReceived: false,
  error: null,
};

export const groups = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.groups.request:
    case actionTypes.groups.delete:
    case actionTypes.groups.save:
    case actionTypes.groups.update:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.groups.success:
      return {
        ...state,
        isFetch: false,
        isDataReceived: true,
        groupsData: action.body,
      };

    case actionTypes.groups.error:
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
