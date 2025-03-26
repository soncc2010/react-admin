import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './cookies';

const apiRequest = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

apiRequest.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiRequest.interceptors.response.use(
  (response): AxiosResponse => response.data,
  async (error) => {
    return Promise.reject({ ...get(error, 'response.data') });
  },
);

export default apiRequest;
