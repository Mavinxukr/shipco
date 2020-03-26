import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';

export const getAutoRequest = async (params, id) => {
  const serverData = await Fetch.get(`get-auto/${id}`, params, {}, true);
  return serverData;
};

export const updateAutoRequest = async (params, body, id) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(
    `http://167.172.214.80/api-admin/update-auto/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: cookies.get('token'),
        Accept: 'application/json',
      },
      body: formData,
      redirect: 'follow',
    },
  );
  const response = serverData.json();
  return response;
};

export const deleteAutoDocumentRequest = async (params, body, id) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(
    `http://167.172.214.80/api-admin/delete-auto-document/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: cookies.get('token'),
        Accept: 'application/json',
      },
      body: formData,
      redirect: 'follow',
    },
  );
  const response = serverData.json();
  return response;
};
