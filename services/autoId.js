import { Fetch } from '../utils/fetcher';

export const getAutoIdRequest = async (params, id) => {
  const serverData = await Fetch.get(`get-auto/${id}`, params, {});
  return serverData;
};
