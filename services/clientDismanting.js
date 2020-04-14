import { Fetch } from '../utils/fetcher';

export const getClientDismantingRequest = async (params) => {
  const serverData = await Fetch.get('get-autos-dismanting', params, {});
  return serverData;
};
