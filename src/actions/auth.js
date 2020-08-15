import {BASE_URL, AUTH_TOKEN, USER_INFO} from './../configs/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {post} from './fetch_requests';

export const login = async (email, password) => {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  let body = {
    email,
    password,
  };
  return post(`${BASE_URL}auth/login`, header, body);
};

export const register = async (name, email, password) => {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  let body = {
    name,
    email,
    password,
  };
  return post(`${BASE_URL}auth/register`, header, body);
};

export const setAuthToken = async (token) => {
  await AsyncStorage.setItem(AUTH_TOKEN, token);
};

export const getAuthToken = async () => {
  let token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN);
};

export const setUserInfo = async (info) => {
  await AsyncStorage.setItem(USER_INFO, info);
};

export const getUserInfo = async () => {
  let userInfo = await AsyncStorage.getItem(USER_INFO);
  return userInfo;
};

export const removeUserInfo = async () => {
  await AsyncStorage.removeItem(USER_INFO);
};
