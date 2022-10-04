import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://127.0.0.1:8080',
    timeout: 1000 * 5
  });
instance.interceptors.request.use(config => {
    // config 请求的所有信息
   // console.log(config);
   return config // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
}, err => {
   // 请求发生错误时的相关处理 抛出错误
  Promise.reject(err)
})
  export default instance;