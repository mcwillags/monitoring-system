import AsyncStorage from "@react-native-async-storage/async-storage";

import axios, { AxiosHeaders } from 'axios';

import { environment } from '../environment';

const instanse = axios.create({
  baseURL: environment.baseApiUrl,
});

instanse.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(environment.tokenKey);

  (config.headers as AxiosHeaders).set('Authorization', `$Bearer ${token}`);

  return config;
});

export { instanse };
