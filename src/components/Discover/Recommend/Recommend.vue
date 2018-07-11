<template>
<div class="recommend-content">
  <div class="focus">
    <slider class="slide-box" :auto="5000" v-if="focus.length">
      <slider-item
        v-for="item in focus"
        :key="item.id"
      >
        <router-link
          :to="'/album?albummid='+item.jump_info.url"
        >
          <img class="album-cover" v-src:before-load="item.pic_info.url">
        </router-link>
      </slider-item>
    </slider>
    <div class="slider-placeholder" v-else></div>
  </div>
  <!-- 推荐球 -->
  <dragonBalls
    :balls="balls"
  />
  <!-- 分类卡片：推荐歌单 -->
  <category-card
    link="/songSheet"
    title="推荐歌单"
    :items="recommends"
  ></category-card>

  <category-card
    link="/album"
    title="最新音乐"
    :items="newAlbum.slice(0, 9)"
  ></category-card>
</div>
</template>

<script>
import dragonBalls from '#/common/dragonballs'
import categoryCard from '#/common/categoryCard'
import lazyload from '#/common/lazyload'

import {Swipe, SwipeItem} from 'mint-ui'

import {mapGetters} from 'vuex'
export default {
  components: {
    'slider': Swipe,
    'slider-item': SwipeItem,
    dragonBalls,
    categoryCard,
    lazyload
  },
  data () {
    return {
      balls: [
        {
          title: '私人FM',
          link: '/player/fm',
          img: require('#/common/img/t_dragonball_icn_fm.png')
        },
        {
          title: '每日推荐',
          link: '/daily',
          img: require('#/common/img/t_dragonball_icn_daily.png'),
          innerText: new Date().getDate()
        },
        {
          title: '歌单',
          link: '/songSheet',
          img: require('#/common/img/t_dragonball_icn_playlist.png')
        },
        {
          title: '排行榜',
          link: '/rank',
          img: require('#/common/img/t_dragonball_icn_rank.png')
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['focus', 'recomPlaylist', 'newAlbum']),
    recommends () {
      let items = []
      if (this.recomPlaylist.length) {
        for (let [index, {
          title,
          content_id: id,
          cover: img,
          listen_num: listenNum
        }] of this.recomPlaylist.entries()) {
          items.push({
            title,
            id,
            listenNum,
            link: '/songSheet/' + id,
            img
          })
          if (index === 5) break
        }
      }
      return items
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
img[lazy=loading] {
  width: 355 / $base + rem;
  height: 142 / $base + rem;
}
.recommend-content {
  width: 100vw;
  height: 100%;
  overflow: auto;
  .focus {
    padding: 10px;
    background-image:linear-gradient($theme-color 70%, white 70%);
    .slide-box {
      width: 355 / $base + rem;
      height: 142 / $base + rem;
    }
    .before-load {
      width: 355 / $base + rem;
      height: 142 / $base + rem;
      background: #ccc url('~@/components/common/img/loading.png') no-repeat center / auto 50%;
    }
    .album-cover {
      width: 100%;
      border-radius: 5px;
      background-color: #ccc;
    }
    .slider-placeholder {
      background: #ccc;
      border-radius: 5px;
      width: 355 / $base + rem;
      height: 142 / $base + rem;
    }
  }
  & /deep/ .mint-swipe-indicator {
    opacity: 0.8;
    background-color: #999;
    &.is-active {
      background-color: $theme-color!important;
    }
  }
}
</style>
