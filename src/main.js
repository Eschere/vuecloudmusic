// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/* eslint-disable */
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
/*

function _getGuid() { 
  if (_guid.length > 0) return _guid; 
  var e = MUSIC.cookie.get("pgv_pvid"); 
  if (e && e.length > 0) return _guid = e; 
  var t = (new Date).getUTCMilliseconds(); 
  return _guid = Math.round(2147483647 * Math.random()) * t % 1e10,
  // document.cookie = "pgv_pvid=" + _guid + "; Expires=Sun, 18 Jan 2038 00:00:00 GMT; PATH=/; DOMAIN=qq.com;", _guid 
}
let obj = {
filename:"C400000Mxw3T3gA9rn.m4a",
songmid:"000Mxw3T3gA9rn",
subcode:0,
vkey:"0AC3B69393F818B381562F1B33656C0234FBA8A812490699C207CBC8670F1FE321231A059932B10BA99664F868CBBDB7C5FE1F768EC5631F"
}

'http://dl.stream.qqmusic.qq.com/C400000Mxw3T3gA9rn.m4a?vkey=0AC3B69393F818B381562F1B33656C0234FBA8A812490699C207CBC8670F1FE321231A059932B10BA99664F868CBBDB7C5FE1F768EC5631F&guid=675807192&uin=0&fromtag=66'
*/