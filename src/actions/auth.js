import {BASE_URL, AUTH_TOKEN} from './../configs/Constants';

export const login = async (email, password) => {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  let body = {
    email,
    password,
  };
  return post(`${BASE_URL}auth/login`, header, body);
};
