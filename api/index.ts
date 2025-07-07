import axios, {AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import * as SecureStore from 'expo-secure-store';

import {TOKEN} from 'cons';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 100000,
});

const requestHandler = async (request: InternalAxiosRequestConfig & AxiosRequestConfig) => {
  const token = SecureStore.getItem(TOKEN);
  if (token) request.headers.Authorization = `Bearer ${token}`;
  request.headers.Authorization = `Bearer ${token}`;

  return request;
};

const responseHandler = (response: AxiosResponse) => response.data;

const errorHandler = (error: unknown) => Promise.reject(error);

instance.interceptors.request.use(
  request => requestHandler(request),
  error => errorHandler(error),
);

instance.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error),
);

export default instance;
