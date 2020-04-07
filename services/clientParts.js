import { Fetch } from '../utils/fetcher';

export const getClientPartsRequest = async (params) => {
  const serverData = await Fetch.get('get-parts', params, {});
  return serverData;
};

export const deleteClientPartsRequest = async (params, id) => {
  const serverData = await Fetch.delete(`delete-part/${id}`, params, {});
  return serverData;
};

export const addNewClientPartsRequest = async (params, body) => {
  const serverData = await Fetch.post('store-part', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const updateClientPartsRequest = async (params, body, id) => {
  const serverData = await Fetch.post(`update-part/${id}`, params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
