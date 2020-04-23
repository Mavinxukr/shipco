import { Fetch } from '../utils/fetcher';

export const getPricesRequest = async (params, id) => {
  const url = id ? `get-price/${id}` : 'get-prices';
  const serverData = await Fetch.get(url, params, {}, true);
  return serverData;
};

export const addPricesRequest = async (params, body) => {
  const serverData = await Fetch.post(
    'store-price',
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};

export const deletePricesRequest = async (params, id) => {
  const serverData = await Fetch.delete(`delete-price/${id}`, params, {}, true);
  return serverData;
};

export const updatePricesRequest = async (params, body, id) => {
  const serverData = await Fetch.post(
    `update-price/${id}`,
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};
