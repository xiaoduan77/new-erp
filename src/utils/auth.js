import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TimeKey = 'heima_time_key'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 把时间戳存入
export function setTime(time) {
  return Cookies.set(TimeKey, time)
}
// 把时间戳取出来
export function getTime() {
  return Cookies.get(TimeKey)
}
