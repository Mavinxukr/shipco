import { Fetch } from '../utils/fetcher';

export const getOverviewRequest = async (params) => {
  const serverData = await Fetch.get('overview', params, {});
  return serverData;
};
