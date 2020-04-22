import { Fetch } from '../utils/fetcher';

export const getGroupsRequest = async (params) => {
  const serverData = await Fetch.get('get-groups', params, {}, true);
  return serverData;
};

export const deleteGroupsRequest = async (params, id) => {
  const serverData = await Fetch.delete(`delete-group/${id}`, params, {}, true);
  return serverData;
};

export const addGroupsRequest = async (params, body) => {
  const serverData = await Fetch.post(
    'store-group',
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};

export const updateGroupsRequest = async (params, body, id) => {
  const serverData = await Fetch.post(
    `update-group/${id}`,
    params,
    {
      body: JSON.stringify(body),
    },
    true,
  );
  return serverData;
};
