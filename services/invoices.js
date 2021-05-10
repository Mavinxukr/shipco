import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { API_DOMAIN_ADMIN } from '../enums/api';
import { getSession } from 'next-auth/client';

export const getInvoicesRequest = async (params) => {
  const serverData = await Fetch.get('get-invoices', params, {}, true);
  return serverData;
};

export const updateInvoicesRequest = async (params, body, id) => {
  const session = await getSession();
  const token = session ? session.accessToken : null;
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
    `${API_DOMAIN_ADMIN}restore-invoice-document/${id}`,
    {
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
