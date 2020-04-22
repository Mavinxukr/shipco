import { Fetch } from '../utils/fetcher';

export const getPricesRequest = async (params) => {
  const serverData = await Fetch.get('get-prices', params, {}, true);
  return serverData;
};
