import axios from 'axios';
import URLSearchParams from 'url-search-params';


const globalConfig = (axios) => {
  axios.defaults.timeout = 10000;
};

const transformRequest = (axios) => {
  axios.defaults.transformRequest = [function (data, headers) {
    // 忽略 非POST 请求
    if (data === undefined) {
      return;
    }
    // emulateJSON => json
    if (!data.emulateJSON) {
      headers['Content-Type'] = 'application/json;charset=UTF-8';
      console.log('!emulateJSON');
      return JSON.stringify(data);
    }

    // emulateJSON => x-www-form-urlencoded
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    let params = new URLSearchParams();
    Object.keys(data).forEach(function (key) {
      if (key !== 'emulateJSON') {
        params.append(key, data[key]);
      }
    });
    return params;
  }];
};

// intercept requests or responses before they are handled by then or catch
const addRequestInterceptors = (axios) => {
  axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
};

const addResponseInterceptors = (axios) => {
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
};

const accessInVueInstance = (Vue, axios) => {
  Vue.prototype.$http = axios;
};

const config = (Vue) => {
  globalConfig(axios);
  transformRequest(axios);
  addRequestInterceptors(axios);
  addResponseInterceptors(axios);
  accessInVueInstance(Vue, axios);
};

const api = ({url, method = 'POST', params = {}, emulateJSON = false, successCallback, errorCallback}) => {
  let reqConf = {
    method, url,
    cancelToken: new axios.CancelToken(function (cancel) {
      console.log('request is canceled');
    })
  };
  if (method === 'POST' && emulateJSON) {
    params.emulateJSON = true;
  }
  reqConf[method === 'POST' ? 'data' : 'params'] = params;

  return axios(reqConf).then((response) => {
    let rspCode = response.data.code;
    if (rspCode === '0') {
      successCallback && successCallback(response.data.data);
    } else {
      errorCallback && errorCallback(response);
    }

    return response
  }).catch((error) => {
    if (error.response) {
      errorCallback && errorCallback(error.response);
    } else {
      console.error('[Error]', error.message);
    }
    console.error(error.config);
  });
};
export default {
  config,
  api
};
