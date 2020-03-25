import { combineReducers } from 'redux';
import { currentUser } from './currentUser';
import { overview } from './overview';
import { notifications } from './notifications';
import { baseClient } from './baseClient';
import { client } from './client';
import { currentClient } from './currentClient';
import { auto } from './auto';

export default combineReducers({
  currentUser,
  overview,
  notifications,
  baseClient,
  client,
  currentClient,
  auto,
});
