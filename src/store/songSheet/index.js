// 歌单相关数据
import jsonp from 'jsonp'
export default {
  namespaced: true,
  state: {
    tags: [],
    category: {
      categoryId: 10000000,
      categoryName: '全部歌单'
    }
  },
  getters: {
    categoryHot (state) {
      return state.tags.length
        ? [state.tags[1].items[0], state.tags[2].items[0], state.tags[3].items[0]]
        : []
    }
  },
  mutations: {
    saveTags (state, tags) {
      state.tags = tags
    },
    changeCategory (state, category) {
      state.category = category
    }
  },
  actions: {
    getSongSheetTags ({commit, rootState}) {
      jsonp(rootState.config.server + '/songSheetTag', {
        name: 'getPlaylistTags'
      }, (err, data) => {
        if (err) console.log('Get SongSheetTags Failed')
        else {
          let tags = []
          for (let [index, category] of data.data.categories.entries()) {
            tags.push({
              categoryGroupName: category.categoryGroupName,
              items: []
            })
            for (let {categoryId, categoryName} of category.items) {
              tags[index].items.push({
                categoryId,
                categoryName
              })
            }
          }
          tags[0].items[0].categoryName = '全部歌单'
          commit('saveTags', tags)
        }
      })
    }
  }
}
