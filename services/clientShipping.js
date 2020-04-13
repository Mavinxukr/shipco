import { Fetch } from '../utils/fetcher';

export const getClientShippingRequest = async (params) => {
  const serverData = await Fetch.get('get-autos-shipping', params, {});
  return serverData;
};

export const addNoteRequest = async (params, body) => {
  const serverData = await Fetch.post('store-note', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
