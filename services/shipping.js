import { Fetch } from '../utils/fetcher';

export const getShippingRequest = async (params) => {
  const serverData = await Fetch.get('get-autos-shipping', params, {}, true);
  return serverData;
};

export const updateShippingRequest = async (params, body, id) => {
  const serverData = await Fetch.post(
    `update-auto-shipping/${id}`,
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};

export const addNoteRequest = async (params, body) => {
  const serverData = await Fetch.post(
    'store-note',
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};

export const storeShippingRequest = async (params, body) => {
  const serverData = await Fetch.post(
    'store-auto-shipping',
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};
