import { Fetch } from '../utils/fetcher';

export const getClientRequest = async (params) => {
  const serverData = await Fetch.get('get-autos', params, {}, true);
  return serverData;
};

export const deleteClientRequest = async (params, body) => {
  const serverData = await Fetch.post('delete-auto', params, {
    body: JSON.stringify(body),
  }, true);
  return serverData;
};
