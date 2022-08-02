import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// 白名单就是直接放行，不用看权限
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    // 如果有token，去登录页面就不能去了，直接去后台首页
    if (to.path === '/login') {
      NProgress.done()
      next('/')
    } else {
      // 只会发一次ajax请求
      if (!store.state.user.userInfo.id) {
        // 如果有token的话，并且它不是要去login页面，就可以允许路由守卫放行，调用获取用户信息这个接口
        store.dispatch('user/getInfo')
      }
      next()
    }
    // 如果没有token
  } else {
    // 如果没有token，想去白名单里面的这些网页，就放行让它去
    if (whiteList.includes(to.path)) {
      next()
      // 如果不是白名单里面的网页，就让它去登录页面
    } else {
      next('/login')
    }
  }
})

// 后置路由守卫
router.afterEach(() => {
  NProgress.done()
})
