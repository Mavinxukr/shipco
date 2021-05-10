import _ from 'lodash';
import qs from 'query-string';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';
import { API_DOMAIN_ADMIN } from '../enums/api';
import { getSession } from 'next-auth/client';

export const getClientRequest = async (params) => {
  const serverData = await Fetch.get('get-autos', params, {}, true);
  return serverData;
};

export const deleteClientRequest = async (params, body) => {
  const serverData = await Fetch.post(
    'delete-auto',
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};

export const addNewClientRequest = async (params, body) => {
  const session = await getSession();
  const token = session ? session.accessToken : null;
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    if (key === 'invoice_document') {
      let indexFile = 0;
      value.forEach((item) => {
        formData.append(`invoice_document[${indexFile}][type]`, item.type);
        formData.append(`invoice_document[${indexFile}][file]`, item.file[0]);
        indexFile += 1;
      });
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(
    `${API_DOMAIN_ADMIN}store-auto?${qs.stringify(params)}`,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
      body: formData,
      redirect: 'follow',
    },
  );
  const response = serverData.json();
  return response;
};
