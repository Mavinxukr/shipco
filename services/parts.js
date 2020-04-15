import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';

export const getPartsRequest = async (params) => {
  const serverData = await Fetch.get('get-parts', params, {}, true);
  return serverData;
};

export const deletePartsRequest = async (params, body, id) => {
  const serverData = await Fetch.delete(`delete-part/${id}`, params, body, true);
  return serverData;
};

export const addNewPartsRequest = async (params, body) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    if (key === 'image') {
      let indexFile = 0;
      value.forEach((item) => {
        formData.append(`image[${indexFile}]`, item);
        indexFile += 1;
      });
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(
    'http://167.172.214.80//api-admin/store-part',
    {
      method: 'POST',
      headers: {
        Authorization: cookies.get('tokenShipco'),
        Accept: 'application/json',
      },
      redirect: 'follow',
      body: formData,
    },
  );
  const response = await serverData.json();
  return response;
};

export const updatePartsRequest = async (params, body, id) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    if (key === 'image') {
      let indexFile = 0;
      value.forEach((item) => {
        formData.append(`image[${indexFile}]`, item);
        indexFile += 1;
      });
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(
    `http://167.172.214.80//api-admin/update-part/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: cookies.get('tokenShipco'),
        Accept: 'application/json',
      },
      redirect: 'follow',
      body: formData,
    },
  );
  const response = await serverData.json();
  return response;
};

export const deletePartsImageRequest = async (params, body, id) => {
  const serverData = await Fetch.post(
    `delete-part-images/${id}`,
    params,
    body,
    true,
  );
  return serverData;
};
