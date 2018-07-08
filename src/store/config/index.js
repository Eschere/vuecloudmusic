// 远程服务器地址
const server = 'http://192.168.1.6:8080'

export default {
  namespaced: true,
  state: {
    server
  },
  mutations: {
    setServer (state, url) {
      const serve = url || localStorage.getItem('server') || (localStorage.setItem('server', server), server)
      state.server = serve
    }
  }
}
