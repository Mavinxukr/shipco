import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';

export const login = async (params, body) => {
  const serverData = await Fetch.post('login', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const registration = async (params, body) => {
  const serverData = await Fetch.post('register', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const getCurrentUserRequest = async (params) => {
  const serverData = await Fetch.get('get-profile', params, {});
  return serverData;
};

export const editCurrentUserRequest = async (params, body) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch('http://167.172.214.80/api-client/update-profile', {
    method: 'POST',
    headers: {
      Authorization: cookies.get('tokenShipco'),
      Accept: 'application/json',
    },
    body: formData,
    redirect: 'follow',
  });
  const response = serverData.json();
  return response;
};

export const getClientById = async (params, id) => {
  const url = id ? `get-client/${id}` : 'get-client';
  const serverData = await Fetch.get(url, params, {}, true);
  return serverData;
};

export const updateClientById = async (params, body, id) => {
  const serverData = await Fetch.post(`update-client/${id}`, params, {
    body: JSON.stringify(body),
  }, true);
  return serverData;
};
