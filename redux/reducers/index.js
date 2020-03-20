import { combineReducers } from 'redux';
import { currentUser } from './currentUser';
import { overview } from './overview';
import { notifications } from './notifications';
import { baseClient } from './baseClient';

export default combineReducers({
  currentUser,
  overview,
  notifications,
  baseClient,
});
