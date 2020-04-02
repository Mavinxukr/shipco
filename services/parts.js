import { Fetch } from '../utils/fetcher';

export const getPartsRequest = async (params) => {
  const serverData = await Fetch.get('get-parts', params, {}, true);
  return serverData;
};
