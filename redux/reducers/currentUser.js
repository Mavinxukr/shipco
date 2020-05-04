import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetch: false,
  currentUser: null,
  isAuth: false,
  error: null,
};

export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.currentUser.request
    || actionTypes.currentUser.update
    || actionTypes.currentUser.delete:
      return {
        ...state,
        isFetch: true,
      };

    case actionTypes.currentUser.success:
      return {
        ...state,
        isFetch: false,
        isAuth: true,
        currentUser: action.body,
      };

    case actionTypes.currentUser.error:
      return {
        ...state,
        isFetch: false,
        isAuth: false,
        error: action.error,
      };

    default:
      return state;
  }
};
