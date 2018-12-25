import axios from "axios";

// 超时时间
axios.defaults.timeout = 600000;
// 请求头
axios.defaults.headers.common = {
  "Content-Type": "application/json;charset=UTF-8"
};
// 携带cookie信息
// axios.defaults.withCredentials = true;

// http请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http响应拦截器
axios.interceptors.response.use(
  data => {
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
