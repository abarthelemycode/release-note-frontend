import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export const apiPlugin = (store) => {
  instance.interceptors.request.use(
    // Do something before request is sent
    (config) => {
      config.headers.Token = localStorage.getItem('token');
      return config;
    },
    // Do something with request error sent
    (error) => {
      // check if authorized or not
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    // Do something before request is sent
    config => config,
    // Do something with request error
    (error) => {
      // check if authorized or not
      const statusCode = error.response.status;

      if (statusCode === 401) {
        store.dispatch('errorHandlingModule/getErrorApi', error.response, { root: true });
      }
      if (statusCode === 403) {
        store.dispatch('errorHandlingModule/getErrorApi', error.response, { root: true });
      }
      if (statusCode === 404) {
        store.dispatch('errorHandlingModule/getErrorApi', error.response, { root: true });
      }
      if (statusCode === 500) {
        store.dispatch('errorHandlingModule/getErrorApi', error.response, { root: true });
      }

      return Promise.reject(error.response.data);
    },
  );

  store.api = instance;
};

export default instance;
