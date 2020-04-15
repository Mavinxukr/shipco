import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';

export const getInvoicesRequest = async (params) => {
  const serverData = await Fetch.get('get-invoices', params, {}, true);
  return serverData;
};

export const updateInvoicesRequest = async (params, body, id) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (key === 'document') {
      value.forEach((item) => {
        formData.append('document[0][type]', item.type);
        formData.append('document[0][file]', item.file[0]);
      });
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(
    `http://167.172.214.80/api-admin/restore-invoice-document/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: cookies.get('tokenShipco'),
        Accept: 'application/json',
      },
      body: formData,
      redirect: 'follow',
    },
  );
  const response = serverData.json();
  return response;
};
