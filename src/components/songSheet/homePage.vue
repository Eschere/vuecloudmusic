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
      <div class="category-hot" v-if="randCategory.length">
        <span
          class="hot-item"
          v-for="(item,index) in randCategory"
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
import {mapState, mapGetters} from 'vuex'
import jsonp from 'jsonp'

export default {
  components: {
    detailPage
  },
  data () {
    return {
      // categoryHot: ['华语', '轻音乐', '摇滚'],
      list: null
    }
  },
  computed: {
    ...mapState('config', ['server']),
    ...mapState('songSheet', ['category']),
    ...mapGetters('songSheet', ['randCategory'])
  },
  created () {
    jsonp(this.server + '/songSheet?categoryId=' + this.category.categoryId, {
      name: 'getPlaylist'
    }, (err, data) => {
      if (err) console.log('Get SongSheet Failed')
      else {
        this.list = data.data.list
      }
    })
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
