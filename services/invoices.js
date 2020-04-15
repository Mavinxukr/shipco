import { Fetch } from '../utils/fetcher';

export const getInvoicesRequest = async (params) => {
  const serverData = await Fetch.get('get-invoices', params, {}, true);
  return serverData;
};
