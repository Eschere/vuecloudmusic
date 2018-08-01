// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
/* eslint-disable */
import store from './store'

// 自定义指令
import {lazyLoad, touchLight} from '@/directive'
Vue.use(lazyLoad)
Vue.use(touchLight)

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

// 优化滚动条效果
import '@/assets/iscroll-probe.js'


// 字体样式表
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false

// 自适应
let html = document.documentElement || document.querySelector('html')
let width = document.documentElement.clientWidth || window.innerWidth
html.style.fontSize = width / 3.75 + 'px'

// ui库
// vue-ydui样式表
// import 'vue-ydui/dist/ydui.base.css'
// better-scroll
// import VueScroll from 'vue-scroller'
// Vue.use(VueScroll)

// mint-ui
// 懒加载
// import {Lazyload} from 'mint-ui'
// Vue.use(Lazyload)
// 无限滚动
import {InfiniteScroll} from 'mint-ui'
Vue.use(InfiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

console.log('%cVMusic demo 1.2.5/By yemao', 'background:#41b883;font-size:16px')
