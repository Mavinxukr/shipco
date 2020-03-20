import { Fetch } from '../utils/fetcher';

export const loginAdmin = async (params, body, isUserAdmin) => {
  const serverData = await Fetch.post('login', params, {
    body: JSON.stringify(body),
  }, isUserAdmin);
  return serverData;
};
