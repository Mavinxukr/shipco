import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';
import { API_DOMAIN_ADMIN } from '../enums/api';

export const getBaseClientRequest = async (params) => {
  const serverData = await Fetch.get('get-clients', params, {}, true);
  return serverData;
};

export const deleteBaseClientRequest = async (params, body) => {
  const serverData = await Fetch.post('delete-client', params, {
    body: JSON.stringify(body),
  }, true);
  return serverData;
};

export const addNewBaseClientRequest = async (params, body) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(`${API_DOMAIN_ADMIN}store-client`, {
    method: 'POST',
    headers: {
      Authorization: cookies.get('tokenShipco'),
      Accept: 'application/json',
    },
    redirect: 'follow',
    body: formData,
  });
  const response = await serverData.json();
  return response;
};
