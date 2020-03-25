import qs from 'query-string';
import _ from 'lodash';
import { cookies } from './getCookies';
import { API_DOMAIN_ADMIN, API_DOMAIN_CLIENT } from '../enums/api';

export const generalOptions = co => ({
  // mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: co.get('token'),
    'Access-Control-Allow-Origin': '*',
  },
});

const Fetcher = method => async (url, params, options, isUserAdmin) => {
  const domain = isUserAdmin ? API_DOMAIN_ADMIN : API_DOMAIN_CLIENT;
  const paramsString = !_.isEmpty(params) ? `?${qs.stringify(params)}` : '';
  const body = await fetch(`${domain}${url}${paramsString}`, {
    method,
    ...generalOptions(cookies),
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
