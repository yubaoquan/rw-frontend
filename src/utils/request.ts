import axios from 'axios';
import { backendBase } from 'config/index';

export const request = axios.create({ baseURL: backendBase });

export function genApi(config: any) {
  return () => request(config);
}

export const get = (url: string, config = {}) => () => request({
  ...config,
  url,
  method: 'GET',
});

export const post = (url: string, config = {}) => () => request({
  ...config,
  url,
  method: 'POST',
});

export const del = (url: string, config = {}) => () => request({
  ...config,
  url,
  method: 'DELETE',
});

export const put = (url: string, config = {}) => () => request({
  ...config,
  url,
  method: 'PUT',
});
