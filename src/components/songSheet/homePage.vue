<template>
<detail-page
  title="歌单"
>
  <div class="content">
    <div class="category-tab">
      <router-link
        class="category-selected"
        to="/songSheet/category"
      >
        <span v-html="category.categoryName"></span>
        <span class="right-icon"></span>
      </router-link>
      <div class="category-hot" v-if="categoryHot.length">
        <v-touch
          v-for="(item,index) in categoryHot"
          @tap="changeCategory(item)"
          tag="span"
          class="hot-item"
          :key="'ctgyh' + index"
          :style="{borderLeft: index !== 0 ? '0.5px solid #ddd' : ''}"
        >
          {{item.categoryName}}
        </v-touch>
      </div>
    </div>
    <div
      class="songsheet-list"
      v-if="list.length"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="300"
    >
      <div
        class="songsheet-item"
        v-for="item in list"
        :key="'ssdissid'+item.dissid"
      >
        <v-touch
          @tap.prevent="showSongList(item)"
        >
          <div class="item-cover">
            <span class="badgeNum">{{item.listennum >= 100000?Math.floor(item.listennum/10000)+'万':item.listennum}}</span>
            <span class="badgeCreator">{{item.creator.name}}</span>
            <div class="item-img" v-src:before-load="item.imgurl"></div>
          </div>
          <p class="title">{{item.dissname}}</p>
        </v-touch>
      </div>
      <div class="loading-placeholder" v-if="loading">
        <span class="icon"></span>
      </div>
    </div>
    <div class="loading-placeholder" v-else>
      <span class="icon"></span>
    </div>
  </div>
</detail-page>
</template>
<script>
import detailPage from '#/common/detailFramework'
import {mapState, mapGetters, mapMutations} from 'vuex'
import jsonp from 'jsonp'

export default {
  components: {
    detailPage
  },
  data () {
    return {
      list: [],
      sin: 0,
      ein: 29,
      loading: true
    }
  },
  computed: {
    ...mapState('config', ['server']),
    ...mapState('songSheet', ['category', 'currentList']),
    ...mapGetters('songSheet', ['categoryHot'])
  },
  methods: {
    ...mapMutations('songSheet', ['changeCategory', 'saveCurrentList']),
    requestSongSheet (cb) {
      this.loading = true
      jsonp(`${this.server}/songSheet?categoryId=${this.category.categoryId}&sin=${this.sin}&ein=${this.ein}`, {
        name: 'getPlaylist'
      }, (err, data) => {
        if (err) console.log('Get SongSheet Failed')
        else {
          cb && cb(data)
        }
        this.loading = false
      })
    },
    loadMore () {
      this.requestSongSheet((data) => {
        this.list.push(...data.data.list)
        this.sin += 30
        this.ein += 30
      })
    },
    showSongList (item) {
      this.saveCurrentList(item)
      this.$nextTick(() => {
        this.$router.push('/songSheet/' + item.dissid)
      })
    }
  },
  created () {
    this.requestSongSheet((data) => {
      this.list = data.data.list
      this.sin += 30
      this.ein += 30
    })
  },
  watch: {
    'category.categoryId' () {
      this.sin = 0
      this.ein = 29
      this.requestSongSheet((data) => {
        this.list = data.data.list
        this.sin += 30
        this.ein += 30
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.content {
  .category-tab {
    display: flex;
    align-items: center;
    margin: 15px 10px;
    display: flex;
    justify-content: space-between;
    .category-selected {
      box-sizing: border-box;
      padding: 0 13px;
      font-size: 13px;
      height: 28px;
      border: 1px solid #ddd;
      border-radius: 28px;
      display: flex;
      align-items: center;
      color: #333;
      .right-icon {
        margin-left: 12px;
        display: inline-block;
        width: (12 * 14 / 21) + px;
        height: (21 * 14 / 21) + px;
        background: url('~@/components/common/img/aaw.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .category-hot {
    font-size: 13px;
    color: #999;
    .hot-item {
      padding: 0 5px;
    }
  }
  .songsheet-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100vw;
    box-sizing: border-box;
    padding: 0 1vw;
    .songsheet-item {
      width: 48vw;
      height: 63vw;
      .item-cover {
        position: relative;
      }
      .badgeNum {
        background: url("~@/components/common/img/badge-headset.png") no-repeat left / auto 100%;
        font-size: 12px;
        line-height: 12px;
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;
        text-indent: 15px;
        color: white;
      }
      .badgeCreator {
        background: url("~@/components/common/img/badge-user.png") no-repeat left / auto 150%;
        font-size: 12px;
        line-height: 12px;
        position: absolute;
        bottom: 10px;
        left: 5px;
        z-index: 1;
        text-indent: 20px;
        color: white;
      }
      .item-img {
        width: 48vw;
        height: 48vw;
        border-radius: 5px;
        background: {
          size: 100%;
          position: center;
          repeat: no-repeat;
        }
      }
      .before-load {
        // width: 48vw;
        // height: 48vw;
        background: url('~@/components/common/img/cover-loading.png') no-repeat center / 100%;
      }
      .title {
        font-size: 13px;
      }
    }
  }
}
</style>
