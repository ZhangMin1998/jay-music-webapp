import axios from 'axios'

export function request (config) {
  // 1.创建实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
  })

  // 2.axios拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 3.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}
