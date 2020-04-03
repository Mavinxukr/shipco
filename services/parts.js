import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';

export const getPartsRequest = async (params) => {
  const serverData = await Fetch.get('get-parts', params, {}, true);
  return serverData;
};

export const deletePartsRequest = async (params, id) => {
  const serverData = await Fetch.delete(`delete-part/${id}`, params, {}, true);
  return serverData;
};

export const addNewPartsRequest = async (params, body) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(
    'http://167.172.214.80//api-admin/store-part',
    {
      method: 'POST',
      headers: {
        Authorization: cookies.get('token'),
        Accept: 'application/json',
      },
      redirect: 'follow',
      body: formData,
    },
  );
  const response = await serverData.json();
  return response;
};
