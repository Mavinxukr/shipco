import { Fetch } from '../utils/fetcher';

export const getPaymentsRequest = async (params, id) => {
  const url = id ? `get-payment/${id}` : 'get-payments';
  const serverData = await Fetch.get(url, params, {}, true);
  return serverData;
};

export const addPaymentsRequest = async (params, body) => {
  const serverData = await Fetch.post(
    'store-payment',
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};

export const deletePaymentsRequest = async (params, id) => {
  const serverData = await Fetch.delete(`delete-payment/${id}`, params, {}, true);
  return serverData;
};

export const updatePaymentsRequest = async (params, body, id) => {
  const serverData = await Fetch.post(
    `update-payment/${id}`,
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};
