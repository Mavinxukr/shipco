import _ from 'lodash';
import { Fetch } from '../utils/fetcher';

export const getAutoClientRequest = async (params) => {
  const newParams = _.pickBy(params, value => value);
  const serverData = await Fetch.get('get-autos', newParams, {});
  return serverData;
};
