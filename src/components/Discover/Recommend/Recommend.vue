<template>
<div class="recommend-content">
  <div class="focus">
    <yd-slider autoplay="5000" v-if="focus.length">
      <yd-slider-item
        v-for="item in focus"
        :key="item.id"
      >
        <router-link
          :to="'/album?albummid='+item.jump_info.url"
        >
          <img
            class="album-cover"
            v-src:before-load="item.pic_info.url"
          >
        </router-link>
      </yd-slider-item>
    </yd-slider>
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

import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider'
import {mapGetters} from 'vuex'
export default {
  components: {
    'yd-slider': Slider,
    'yd-slider-item': SliderItem,
    dragonBalls,
    categoryCard
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
          cover: img
        }] of this.recomPlaylist.entries()) {
          items.push({
            title,
            id,
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
.recommend-content {
  width: 100vw;
  height: 100%;
  overflow: auto;
  .focus {
    padding: 10px;
    background-image:linear-gradient($theme-color 70%, white 70%);
    .album-cover {
      border-radius: 5px;
      background-color: #ccc;
    }
    .before-load {
      width: 355 / $base + rem;
      height: 142 / $base + rem;
      background:#ccc url('~@/components/common/img/loading.png') no-repeat center / auto 50%;
    }
    .slider-placeholder {
      background: #ccc;
      border-radius: 5px;
      width: 355 / $base + rem;
      height: 142 / $base + rem;
    }
  }
}
</style>
