import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTime } from '@/utils/auth'
import router from '@/router'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})
// 添加请求拦截器
// 原因是因为后面的接口要经常拦截是否有token，然后才获取ajax
request.interceptors.request.use(function (config) {
  const token = store.state.user.token
  if (token) {
    // 每调用token时，就检查token有没有过期
    // 检查token是否过期，如果过期了就让跳转到登录页面
    const time = Date.now() - getTime()
    if (time > 7200000) {
      store.dispatch('user/logout')
      router.push('/login')
    }
    config.headers['Authorization'] = 'Bearer ' + token
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function (error) {
  console.dir(error)
  if (error.response && error.response.data && error.response.data.code === 10005) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
