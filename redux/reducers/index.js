import { combineReducers } from 'redux';
import { currentUser } from './currentUser';
import { overview } from './overview';
import { notifications } from './notifications';
import { baseClient } from './baseClient';
import { client } from './client';
import { currentClient } from './currentClient';
import { auto } from './auto';
import { autoClient } from './autoClient';
import { autoId } from './autoId';
import { parts } from './parts';
import { clientParts } from './clientParts';
import { shipping } from './shipping';

export default combineReducers({
  currentUser,
  overview,
  notifications,
  baseClient,
  client,
  currentClient,
  auto,
  autoClient,
  autoId,
  parts,
  clientParts,
  shipping,
});
