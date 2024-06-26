import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/tailwind.css'
import { router } from '@/router'
// TODO: svg封装为雪碧图
import Svg from 'com/Svg/index.vue'
import 'virtual:svg-icons-register'
import i18n from 'i18n/index'
import piniaPersist from 'pinia-plugin-persist'
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)
const pinia = createPinia()
// 定义全局变量
app.config.globalProperties.$isRole = false
app.config.globalProperties.$prefix = 'bobi-vue-admin'

// app.config.globalProperties.
app.directive('throttle', {
  created: (el, binding) => {
    let throttleTime = binding.value // 节流时间
    if (!throttleTime) {
      // 用户若不设置节流时间，则默认2s
      throttleTime = 2000
    }
    let cbFun
    el.addEventListener(
      'click',
      (event) => {
        if (!cbFun) {
          // 第一次执行
          cbFun = setTimeout(() => {
            cbFun = null
          }, throttleTime)
        } else {
          event && event.stopImmediatePropagation()
        }
      },
      true
    )
  }
})
pinia.use(piniaPersist)
app.use(pinia)
app.use(i18n)
app.component('SvgCom', Svg)
app.use(router)
app.mount('#app')
