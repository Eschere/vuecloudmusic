<template>
<transition name="fade">
  <div
    class="search-page"
    :style="{paddingBottom: playlist.length > 0 ? '50px' : ''}"
  >
    <div class="search-head">
      <v-touch @tap="$router.go(-1)" class="back"></v-touch>
      <input
        type="search"
        class="search-input"
        :placeholder="hotkey.special_key"
        :value="keyword"
        @input="preSearch"
        @keyup.enter="search(keyword, $event)"
        autofocus
        @focus="inputFocus = true"
        @blur="inputFocus = false"
      >
    </div>
    <div class="search-content">
      <!-- 预搜索提示框 -->
      <div
        class="presearch-box"
        v-show="keyword && inputFocus"
      >
        <v-touch
          class="original-word"
          @tap="search(keyword)"
        >搜索"{{keyword}}"</v-touch>
        <v-touch
          v-for="(k,i) in preSearchResult"
          class="smart-word"
          @tap="search(k)"
          :key="'presearch'+i"
        ><span class="iconfont icon-search"></span>{{k}}</v-touch>
      </div>

      <!-- 热门搜索 -->
      <div v-if="!searched"  class="hot-keys">
        <div class="hot-keys-title">
          热门搜索
        </div>
        <div v-if="!searched" class="hot-key-content">
          <transition
            appear
            appear-class="bigger-appear"
            appear-active-class="bigger-appear-active"
            v-for="(k,i) in hotkey.hotkey"
            :key="'hotkey' + i"
          >
            <v-touch
              @tap="search(k.k)"
              class="hot-key-badge"
            >
              {{k.k}}
            </v-touch>
          </transition>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div
        v-else
        class="result-box"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="150"
      >
        <div class="result-list">
          <div
            class="result-item"
            v-for="item in songResult.list"
            :key="'songResult'+item.mid"
          >
            <v-touch
              class="result-info"
              :enabled="!item.pay.pay_play"
              @tap="play(item)"
            >
              <div class="result-songname" :class="{disabled: item.pay.pay_play}">{{item.name}}</div>
              <div class="result-singername">{{item.singer[0].name}} - {{item.album.name}}</div>
            </v-touch>
            <span class="iconfont icon-more-item"></span>
          </div>
          <div class="loading-placeholder" v-if="loading">
            <span class="icon"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import jsonp from 'jsonp'

export default {
  name: 'Search',
  data () {
    return {
      loading: false,
      inputFocus: false,
      searched: false, // 是否搜索过
      hotkey: {
        hotkey: [],
        special_key: ''
      },
      preSearchResult: [],
      songResult: {
        curnum: 0,
        curpage: 1,
        list: [],
        totalnum: 0
      },
      keyword: '',
      searchid: 0,
      searchingWord: '',
      p: 1 // 请求页数
    }
  },
  computed: {
    ...mapState('player', ['playlist', 'currentSong']),
    ...mapGetters('config', ['currentServer'])
  },
  methods: {
    ...mapMutations('player', ['addPlaylistItem']),
    ...mapActions('player', ['requestSongInfo']),
    preSearch (e) {
      this.keyword = e.target.value
      if (this.keyword) {
        jsonp(this.currentServer.url + '/presearch?key=' + this.keyword.trim(), {
          name: 'SmartboxKeysCallbackmod_search' + Math.floor(Math.random() * 8999 + 1000)
        }, (err, data) => {
          if (err) {
            console.log('PreSearch Failed')
          } else {
            let singers = data.data.singer.itemlist.map(item => {
              return item.name
            })
            let songs = data.data.song.itemlist.map(item => {
              return item.name + ' ' + item.singer
            })
            this.preSearchResult = [...singers, ...songs]
          }
        })
      }
    },
    search (keyword, e) {
      e && e.target.blur()
      this.loading = true
      this.keyword = keyword = keyword.trim()
      if (keyword !== '' && keyword !== this.searchingWord) {
        this.p = 1
        this.searched = true
        this.searchingWord = keyword
        let searchid = this.searchid = Math.floor(Math.random() * 89999999999999999 + 10000000000000000)
        this.requestResult({
          keyword,
          searchid,
          cb: (data) => {
            this.loading = false
            this.songResult = data.data.song
          }
        })
      }
    },
    loadMore () {
      if (this.p * 20 < this.songResult.totalnum) {
        this.loading = true
        this.p++
        this.requestResult({
          searchid: this.searchid,
          keyword: this.searchingWord,
          p: this.p,
          cb: (data) => {
            this.loading = false
            this.songResult.list.push(...data.data.song.list)
          }
        })
      }
    },
    play (item) {
      if (this.currentSong.songmid === item.mid) {
        this.$router.push('/player')
        return
      }
      let index = this.currentSong.indexInPlaylist + 1

      if (!this.playlist.length) {
        index = 0
        this.$nextTick(() => {
          this.$router.push('/player')
        })
      }

      this.addPlaylistItem({
        item: {
          albummid: item.album.mid,
          albumname: item.album.name,
          singermid: item.singer[0].mid,
          singername: item.singer[0].name,
          songmid: item.mid,
          songname: item.name
        },
        type: 'follow'
      })

      this.$nextTick(() => {
        this.requestSongInfo({index})
      })
    },
    requestResult ({searchid, keyword, p = 1, n = 20, cb}) {
      jsonp(`${this.currentServer.url}/search?searchid=${searchid}&w=${keyword}&p=${p}&n=${n}`, {
        name: 'MusicJsonCallback925943166737' + Math.floor(Math.random() * 8999 + 1000)
      }, (err, data) => {
        if (err) {
          console.log('Search Failed')
        } else {
          cb && cb(data)
        }
      })
    }
  },
  mounted () {
    // 防止页面被输入法弹起挤压
    document.body.style.width = document.documentElement.style.width = window.innerWidth + 'px'
    document.body.style.height = document.documentElement.style.height = window.innerHeight + 'px'

    jsonp(this.currentServer.url + '/hotkey', {
      name: 'hotSearchKeysmod_top_search'
    }, (err, data) => {
      if (err) {
        console.log('Get HotKey Failed')
      } else {
        this.hotkey = data.data
      }
    })
  },
  activated () {
    document.body.style.width = document.documentElement.style.width = window.innerWidth + 'px'
    document.body.style.height = document.documentElement.style.height = window.innerHeight + 'px'
  },
  deactivated () {
    document.body.style.width = document.documentElement.style.width = ''
    document.body.style.height = document.documentElement.style.height = ''
  },
  destroyed () {
    document.body.style.width = document.documentElement.style.width = ''
    document.body.style.height = document.documentElement.style.height = ''
  }
}
</script>
<style>
.bigger-appear {
  transform: scale3d(0,0,1);
}
.bigger-appear-active {
  transition: transform 0.2s;
}
</style>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.search-page {
  min-height: 100%;
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  .search-head {
    height: 50px;
    background-color: $theme-color;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    .back {
      width: 25 / $base + rem;
      height: 25 / $base + rem;
      background: url("~@/components/common/img/ow.png") no-repeat center / 100%;
      margin: 0 20px;
    }
    .search-input {
      appearance: textfield;
      height: 30px;
      background: none;
      border: none;
      color: rgba($color: white, $alpha: .8);
      border-bottom: 1px solid rgba($color: #eee, $alpha: .6);
      margin-right: 5px;
      flex: 1;
      outline: none;
      font-size: 18px;
      &::placeholder {
        color: rgba($color: #eee, $alpha: .6);
      }
    }
  }
  .search-content {
    flex: 1;
    padding: 10px;
    overflow: hidden;;
    position: relative;
    display: flex;
    flex-direction: column;
    .hot-keys {
      .hot-keys-title {
        color: #999;
        font-size: 12px;
        height: 50px;
        line-height: 50px;
      }
      .hot-key-badge {
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 30px;
        padding: 5px 10px;
        margin: 5px;
        font-size: 14px;
      }
    }
    .presearch-box {
      position: absolute;
      z-index: 10;
      width: 95%;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      background-color: white;
      box-shadow: 0 5px 20px #ddd;
      max-height: 95%;
      overflow: auto;
      @mixin search-word {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        @include thin-line();
      }
      .original-word {
        @include search-word();
        color: #7575d6;
      }
      .smart-word {
        @include search-word();
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        .icon-search {
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }

    /* 结果列表 */
    .result-box{
      flex: 1;
      overflow: auto;
      .result-list {
        .result-item {
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          @include thin-line();
          .icon-more-item {
            color: #ccc;
          }
          .result-info {
            flex: 1;
            .result-songname {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 16px;
            }
            .result-songname.disabled {
              color: #999;
            }
            .result-singername {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #999;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
