import { Fetch } from '../utils/fetcher';

export const getDismantingRequest = async (params) => {
  const serverData = await Fetch.get('get-autos-dismanting', params, {}, true);
  return serverData;
};
