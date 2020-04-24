import { Fetch } from '../utils/fetcher';

export const parserRequest = async (params, table) => {
  const serverData = await Fetch.get(`parser/${table}`, params, {}, true);
  return serverData;
};
