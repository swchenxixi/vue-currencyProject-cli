import Vue from 'vue';
import axios from 'axios';
import constant from './config.js';
import router from '@/router';
Vue.use(axios);

class Exception {
  constructor(message) {
    this.message = message;
  }
  toString() {
    return this.message;
  }
}
/* 全局配置 */
axios.defaults.timeout = constant.TIMEOUT;
axios.defaults.baseURL = constant.BASE_URL;
/* 请求拦截 */
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token');
    config.headers = {
      'Content-Type': constant.CONTENT_TYPE,
      token: token
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
/* 响应拦截 */
axios.interceptors.response.use(
  response => {
    let data = response.data;
    let code = data.code;
    if (code === 200) {
      return data;
    }
    if (code === 402) {
      router.replace({
        path: '/login' // 到登录页重新获取token
      });
    }
    throw new Exception(data.msg);
  },
  error => {
    throw new Exception(error.message);
  }
);
/* 导出 */
// export function get(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url, { params })
//       .then(response => {
//         resolve(response);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// export function post(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(url, params)
//       .then(response => {
//         resolve(response);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }
// export function put(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .put(url, params)
//       .then(response => {
//         resolve(response)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }
// export function del(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .delete(url, params)
//       .then(response => {
//         resolve(response)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }
