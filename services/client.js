import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';

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
  const serverData = await fetch('http://167.172.214.80/api-admin/store-auto', {
    mode: 'cors',
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
