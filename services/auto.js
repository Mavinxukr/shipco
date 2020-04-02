import _ from 'lodash';
import { Fetch } from '../utils/fetcher';
import { cookies } from '../utils/getCookies';

export const getAutoRequest = async (params, id) => {
  const serverData = await Fetch.get(`get-auto/${id}`, params, {}, true);
  return serverData;
};

export const updateAutoRequest = async (params, body, id) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    if (!value) {
      return;
    }
    if (key === 'document') {
      let indexFile = 0;
      value.forEach((item) => {
        if (_.isArray(item.file) && item.file.length > 1) {
          item.file.forEach((itemFile) => {
            formData.append(`document[${indexFile}][type]`, item.type);
            formData.append(`document[${indexFile}][file]`, itemFile);
            indexFile += 1;
          });
        }
        if (_.isObject(item.file) && !_.isEmpty(item.file) && item.file.length === 1) {
          formData.append(`document[${indexFile}][type]`, item.type);
          formData.append(`document[${indexFile}][file]`, item.file[0]);
          indexFile += 1;
        }
      });
      return;
    }
    formData.append(key, value);
  });
  const serverData = await fetch(
    `http://167.172.214.80/api-admin/update-auto/${id}`,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        Authorization: cookies.get('token'),
        Accept: 'application/json',
      },
      body: formData,
      redirect: 'follow',
    },
  );
  const response = serverData.json();
  return response;
};

export const deleteAutoDocumentRequest = async (params, body, id) => {
  const serverData = await Fetch.post(`delete-auto-document/${id}`, params, {
    body: JSON.stringify(body),
  },
  true);
  return serverData;
};
