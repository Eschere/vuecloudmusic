// 远程服务器地址
// const server = 'http://172.86.64.157:8080'
const defaultServer = 'http://192.168.1.6:8080'

// 从本地存储中获取网络配置数据
let server, serverIndex
try {
  server = JSON.parse(localStorage.getItem('server'), true)
  if (!server.length) {
    throw new Error('server mistake')
  }
  serverIndex = localStorage.getItem('serverIndex')
} catch (e) {
  console.log(e)
  server = [
    {
      name: '默认',
      url: defaultServer
    }
  ]
  serverIndex = null
}
export default {
  namespaced: true,
  state: {
    server: server,
    serverIndex: (serverIndex !== null && server.length > serverIndex) ? serverIndex : 0
  },
  getters: {
    currentServer (state) {
      return state.server[state.serverIndex]
    }
  },
  mutations: {
    choseServer (state, index) {
      if (index < state.server.length) {
        try {
          localStorage.setItem('serverIndex', index)
        } catch (e) {
          console.log('Not Support LocalStorage')
        }
        state.serverIndex = index
      } else {
        throw new Error('illegal parameter')
      }
    },
    addServer (state, serverItem) {
      serverItem.name = serverItem.name.trim()
      serverItem.url = serverItem.url.trim()
      if (serverItem.name === '' || serverItem.url === '') {
        return false
      }
      // 查找是否有同名服务器
      let finded = state.server.findIndex(item => {
        return item.name === serverItem.name
      })
      if (finded >= 0) {
        state.server[finded].url = serverItem.url
      } else {
        state.server.push(serverItem)
      }

      try {
        localStorage.setItem('server', JSON.stringify(state.server))
      } catch (e) {
        console.log('Not Support LocalStorage')
      }
    },
    removeServer (state, index) {
      state.server.splice(index, 0)
    }
  }
}
