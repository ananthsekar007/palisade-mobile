import { fetchErrorHandler, normalizeResponseErrors } from "./../utilities/Utilities"

export const post = async (url, header, body) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body),
    })
      .then(res => normalizeResponseErrors(res))
      .then(responseJson => resolve(responseJson))
      .catch(err => {
        fetchErrorHandler(err);
        reject(err);
      });
  });
};

export const put = async (url, header, body) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(body),
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => resolve(res))
      .catch(err => {
        fetchErrorHandler(err);
        reject(err);
      });
  });
};

export const get = async (url, header) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: header,
    })
      .then(res => normalizeResponseErrors(res))
      .then(responseJson => resolve(responseJson))
      .catch(err => {
        fetchErrorHandler(err);
        reject(err);
      });
  });
};

export const Delete = async (url, header) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: header,
    })
      .then(res => normalizeResponseErrors(res))
      .then(responseJson => resolve(responseJson))
      .catch(err => {
        fetchErrorHandler(err);
        reject(err);
      });
  });
};
