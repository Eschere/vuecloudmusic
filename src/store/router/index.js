export default {
  namespaced: true,
  state: {
    music: {
      path: '/music',
      index: 0
    },
    discover: {
      path: '/discover/recommend',
      index: 1
    },
    video: {
      path: '/video/recommend',
      index: 2
    }
  },
  getters: {
    // 获取当前路由的index,用于调节路由切换时的动画效果
    getPathIndex: () => path => {
      if (path.indexOf('/music') === 0) {
        return 0
      } else if (path.indexOf('/discover') === 0) {
        return 1
      } else if (path.indexOf('/video') === 0) {
        return 2
      }
      return -1
    }
  },
  // 存储路由导航到的具体位置,在一级路由回访时跳转到该位置
  mutations: {
    saveDiscover (state, path) {
      state.discover.path = path
    },
    saveVideo (state, path) {
      state.video.path = path
    }
  }
}
