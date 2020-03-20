import { Fetch } from '../utils/fetcher';

export const getNotificationsRequest = async (params) => {
  const serverData = await Fetch.get('notifications', params, {});
  return serverData;
};

export const updateStatusNotificationsRequest = async (params) => {
  const serverData = await Fetch.post('notifications', params, {});
  return serverData;
};
