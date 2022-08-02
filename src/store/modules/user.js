import { login, getInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken, removeToken, setTime } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login (context, data) {
    try {
      const res = await login(data)
      console.log(res)
      console.log(data)
      context.commit('setToken', res)
      setToken(res)
      // 登录的时候把时间戳存到vuex
      setTime(Date.now())
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 将用户信息存入vuex里面，因为后面要频繁的用到这个
  async getInfo(context) {
    const res = await getInfo()
    const res1 = await getUserDetailById(res.userId)
    context.commit('setUserInfo', { ...res, ...res1 })
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
