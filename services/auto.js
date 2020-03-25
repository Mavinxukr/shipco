import { Fetch } from '../utils/fetcher';

export const getAutoRequest = async (params, id) => {
  const serverData = await Fetch.get(`get-auto/${id}`, params, {}, true);
  return serverData;
};
