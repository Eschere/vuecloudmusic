// 歌单相关数据
import jsonp from 'jsonp'
export default {
  namespaced: true,
  state: {
    tags: []
  },
  mutations: {
    saveTags (state, tags) {
      state.tags = tags
    }
  },
  actions: {
    getSongSheetTags ({commit, rootState}, name) {
      jsonp(rootState.config.server + '/songSheetTag', {
        name: 'getPlaylistTags'
      }, (err, data) => {
        if (err) console.log('Get SongSheetTags Failed')
        else {
          let tags = []
          for (let category of data.data.categories) {
            for (let {categoryId, categoryName} of category.items) {
              tags.push({
                categoryId,
                categoryName
              })
            }
          }
          commit('saveTags')
        }
      })
    }
  }
}
