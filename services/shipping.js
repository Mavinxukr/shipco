import { Fetch } from '../utils/fetcher';

export const getShippingRequest = async (params) => {
  const serverData = await Fetch.get('get-autos-shipping', params, {}, true);
  return serverData;
};
