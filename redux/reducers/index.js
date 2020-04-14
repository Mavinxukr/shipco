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
import { clientShipping } from './clientShipping';
import { dismanting } from './dismanting';
import { clientDismanting } from './clientDismanting';
import { autoByContainer } from './autoByContainer';

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
  clientShipping,
  dismanting,
  clientDismanting,
  autoByContainer,
});
