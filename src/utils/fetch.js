import axios from 'axios'
import { Message } from 'element-ui';
import store from '../store';
import { getToken } from '@/utils/auth';
const qs = require('qs')

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000,                // 请求超时时间
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    // data = qs.stringify(data)
    return data;
  }]
});
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// service.defaults.withCredentials=true;
// request拦截器
service.interceptors.request.use(config => {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  config.emulateJSON = true;
  return config;
}, error => {
  // Do something with request error
  // console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
    const code = response.data.code;
    // 50014:Token 过期了 50012:其他客户端登录了 50008:非法的token
    if (code === -1) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      });
      // 登出
      // store.dispatch('FedLogOut').then(() => {
      //   router.push({ path: '/login' })
      // });
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default service;