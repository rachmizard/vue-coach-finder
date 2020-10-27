import axios from 'axios';
import router from './../router.js';

const commonApi = axios.create({
  baseURL: 'https://vue-coach-956f1.firebaseio.com',
  headers: { 'Content-Type': 'application/json' }
})

commonApi.defaults.timeout = 10000;

commonApi.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        case 404:
          alert('page not exist');
          break;
        case 502:
         setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);

export default commonApi;