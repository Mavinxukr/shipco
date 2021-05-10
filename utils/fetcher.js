import qs from 'query-string';
import _ from 'lodash';
import { API_DOMAIN_ADMIN, API_DOMAIN_CLIENT } from '../enums/api';
import { getSession } from 'next-auth/client';

export const generalOptions = (token) => ({
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

const Fetcher = (method) => async (url, params, options, isUserAdmin) => {
  const session = await getSession();
  const token = session ? session.accessToken : null;
  const domain = isUserAdmin ? API_DOMAIN_ADMIN : API_DOMAIN_CLIENT;
  const paramsString = !_.isEmpty(params) ? `?${qs.stringify(params)}` : '';
  const body = await fetch(`${domain}${url}${paramsString}`, {
    method,
    ...generalOptions(token),
    ...options,
    redirect: 'follow',
  });
  const serverData = await body.json();
  return serverData;
};

export const Fetch = {
  get: Fetcher('GET'),
  post: Fetcher('POST'),
  delete: Fetcher('DELETE'),
};
