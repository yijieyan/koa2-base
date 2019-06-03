
const Http = require('axios');
Http.defaults.timeout = 30000;

// 请求类
class ApiService {
  constructor () {
    this.interceptorsOfReq();
    this.interceptorsOfRes();
  }

  get (url, params = {}) {
    if (params) {
      return Http.get(url, {
        params
      }).then(res => res.data);
    }
    return Http.get(url).then(res => res.data);
  }

  post (url, bodyParams = {}, params = {}) {
    if (Object.keys(params).length > 0) {
      for (let key in params) {
        url += `&${key}=${params[key]}`;
      }
    }
    return Http.post(url, bodyParams).then(res => res.data);
  }

  interceptorsOfReq () {
    return Http.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        // throw new Error(`axios 请求出错:${err}`);
        return Promise.reject(err);
      });
  }

  interceptorsOfRes () {
    Http.interceptors.response.use(function (response) {
      return response;
    });
  }
}

// 导出一个对象
module.exports = new ApiService();
