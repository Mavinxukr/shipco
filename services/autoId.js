import { Fetch } from '../utils/fetcher';

export const getAutoIdRequest = async (params, id) => {
  const serverData = await Fetch.get(`get-auto/${id}`, params, {});
  return serverData;
};

export const updateAutoIdRequest = async (params, body) => {
  const serverData = await Fetch.post('store-note', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
