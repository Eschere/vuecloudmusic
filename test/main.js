import Vue from 'Vue'
// import App from './App.vue'
import App from './transiontTest.vue'
/* eslint-disable */
import vueTouch from 'vue-touch'
Vue.use(vueTouch, {name: 'v-touch'})
new Vue({
  el:'#app',
  render: h => h(App)
})
