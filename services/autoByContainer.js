import { Fetch } from '../utils/fetcher';

export const getAutoByContainerRequest = async (params) => {
  const serverData = await Fetch.get(
    'get-autos-by-container',
    params,
    {},
    true,
  );
  return serverData;
};
