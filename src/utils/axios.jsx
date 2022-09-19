import axios from 'axios';

export const baseUrl = 'https://rslang-yanahrebneva.herokuapp.com';

const instance = axios.create({
  baseURL: baseUrl,
});

const errorHandler = (err) => ({
  successful: false,
  code: err.response.status,
  message: err.response.data,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('auth-token')}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => ({ successful: true, data: response.data }),
  (error) => errorHandler(error),
);

export default instance;
