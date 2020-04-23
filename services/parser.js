import { Fetch } from '../utils/fetcher';

export const parserRequest = async (params, body, table) => {
  const serverData = await Fetch.post(
    `parser/${table}`,
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};
