import PageTool from './PageTool'
import UploadImage from './UploadImage'
import FullScreen from '@/components/FullScreen'
export default {
  // install 安装
  // vue的插件的写法
  // 定义插件，插件就是一个普通对象，这个对象就是install，参数就是vue
  // 使用插件，vue.user(插件名)
  install(Vue) {
    Vue.component('PageTool', PageTool)
    Vue.component('UploadImage', UploadImage)
    Vue.component('FullScreen', FullScreen)
  }
}

// vue中如何封装一个插件
// 插件本质就是一个普通对象，只不过必须有一个固定的方法叫install
