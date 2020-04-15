import { Fetch } from '../utils/fetcher';

export const getClientInvoicesRequest = async (params) => {
  const serverData = await Fetch.get('get-invoices', params, {});
  return serverData;
};
