import { Fetch } from '../utils/fetcher';

export const getDismantingRequest = async (params) => {
  const serverData = await Fetch.get('get-autos-dismanting', params, {}, true);
  return serverData;
};

export const updateDismantingRequest = async (params, body, id) => {
  const serverData = await Fetch.post(
    `update-auto-dismanting/${id}`,
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};
