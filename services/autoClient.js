import { Fetch } from '../utils/fetcher';

export const getAutoClientRequest = async (params) => {
  const serverData = await Fetch.get('get-autos', params, {});
  return serverData;
};
