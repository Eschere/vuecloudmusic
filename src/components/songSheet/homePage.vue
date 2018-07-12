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
      {{category}}
      <span class="right-icon"></span>
      </router-link>
      <div class="category-hot">
        <span
          class="hot-item"
          v-for="(item,index) in categoryHot"
          :key="'ctgyh' + index"
          :style="{borderLeft: index !== 0 ? '0.5px solid #ddd' : ''}"
        >
          {{item}}
        </span>
      </div>
    </div>
    <div class="songsheet-list" v-if="list">
      <div
        class="songsheet-item"
        v-for="item in list"
        :key="'ss'+item.dissid"
      >
        <router-link
          :to="'/songSheet/'+item.dissid"
        >
        <div class="item-cover">
          <span class="badgeNum">{{item.listennum >= 100000?Math.floor(item.listennum/10000)+'万':item.listennum}}</span>
          <span class="badgeCreator">{{item.creator.name}}</span>
          <img class="item-img" v-src:before-load="item.imgurl">
        </div>
          <p class="title">{{item.dissname}}</p>
        </router-link>
      </div>
    </div>
  </div>
</detail-page>
</template>
<script>
import detailPage from '#/common/detailFramework'
import {mapState} from 'vuex'
import jsonp from 'jsonp'

export default {
  data () {
    return {
      category: '全部歌单',
      categoryHot: ['华语', '轻音乐', '摇滚'],
      list: null
    }
  },
  computed: {
    ...mapState('config', ['server']),
    ...mapState('songSheet', ['tags'])
  },
  created () {
    jsonp(this.server + '/songSheet', {
      name: 'getPlaylist'
    }, (err, data) => {
      if (err) console.log('Get SongSheet Failed')
      else {
        this.list = data.data.list
      }
    })
  },
  components: {
    detailPage
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.content {
  .category-tab {
    display: flex;
    align-items: center;
    margin: 10px 5px;
    display: flex;
    justify-content: space-between;
    .category-selected {
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 13px;
      height: 30px;
      border: 1px solid #eee;
      border-radius: 30px;
      display: flex;
      align-items: center;
      color: #333;
      .right-icon {
        margin-left: 10px;
        display: inline-block;
        width: (9 * 12 / 15) + px;
        height: (15 * 12 / 15) + px;
        background: url('~@/components/common/img/agy.png') no-repeat;
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
        background: url("~@/components/common/img/badge-user.png") no-repeat left / auto 100%;
        font-size: 12px;
        line-height: 12px;
        position: absolute;
        bottom: 10px;
        left: 5px;
        z-index: 1;
        text-indent: 15px;
        color: white;
      }
      .item-img {
        width: 100%;
        border-radius: 5px;
      }
      .before-load {
        width: 48vw;
        height: 48vw;
        background: url('~@/components/common/img/cover-loading.png') no-repeat center / 100%;
      }
      .title {
        font-size: 13px;
      }
    }
  }
}
</style>
