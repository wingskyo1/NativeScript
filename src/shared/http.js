import Vue from 'nativescript-vue'
import Axios from 'axios'
import store from '../store/index'
import Toaster from 'nativescript-toast'
import { LoadingIndicator } from "nativescript-loading-indicator"
import router from './../router'

// loading indicator config
const loader = new LoadingIndicator();
const loaderOptions = {
  message: 'Loading...',
  android: {
    indeterminate: true,
    cancelable: true,
  }
}


let baseURL = 'https://meusistema.localtunnel.me';
const axios = Axios.create({
  baseURL: `${baseURL}/api/`
});

// request start
axios.interceptors.request.use(config => {

  config.headers.Authorization = store.getters.authToken;
  if (config.url.match(/v1\//gm) && !store.getters.isLogged) { // if is not a public route  (v1 on url ) and the user is not logged
    Toaster.makeText("You are not logged in").show();
    router.push('login');
  } else {
    loader.show(loaderOptions);
  }
  return config;
})

// request end
axios.interceptors.response.use(response => {
  loader.hide();
  response = response.data;
  return response;
}, (error) => {
  loader.hide();
  Toaster.makeText(error.toString()).show();
});

const http = {
  post: (url, data) => axios.post(url, data),
  put: (url, data) => axios.put(url, data),
  get: (url) => axios.get(url),
  delete: (url, data) => axios.delete(url, data)
};

Vue.prototype.$http = http;


