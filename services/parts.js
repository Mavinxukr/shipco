import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { API_DOMAIN_ADMIN } from '../enums/api';
import { getSession } from 'next-auth/client';

export const getPartsRequest = async (params) => {
  const serverData = await Fetch.get('get-parts', params, {}, true);
  return serverData;
};

export const deletePartsRequest = async (params, body, id) => {
  const serverData = await Fetch.delete(
    `delete-part/${id}`,
    params,
    body,
    true,
  );
  return serverData;
};

export const addNewPartsRequest = async (params, body) => {
  const session = await getSession();
  const token = session ? session.accessToken : null;
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
  const serverData = await fetch(`${API_DOMAIN_ADMIN}store-part`, {
    method: 'POST',
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
    redirect: 'follow',
    body: formData,
  });
  const response = await serverData.json();
  return response;
};

export const updatePartsRequest = async (params, body, id) => {
  const session = await getSession();
  const token = session ? session.accessToken : null;
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
  const serverData = await fetch(`${API_DOMAIN_ADMIN}update-part/${id}`, {
    method: 'POST',
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
    redirect: 'follow',
    body: formData,
  });
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
