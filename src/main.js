import Vue from 'vue'
// normalize第三方css库
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 显示中文
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import components from '@/components/index'
// use会自动执行install方法
Vue.use(components)
import * as filters from '@/filter'
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})
import Print from 'vue-print-nb'
// Global instruction
Vue.use(Print)
import i18n from '@/lang/index'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 控制台会有提示
Vue.config.productionTip = false
import * as obj from '@/directives'
Object.keys(obj).forEach(item => {
  Vue.directive(item, obj[item])
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
