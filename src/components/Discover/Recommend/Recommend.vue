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
            :src="item.pic_info.url"
          >
        </router-link>
      </yd-slider-item>
    </yd-slider>
    <div class="slider-placeholder" v-else></div>
  </div>
</div>
</template>

<script>
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider'
import {mapGetters} from 'vuex'
export default {
  components: {
    'yd-slider': Slider,
    'yd-slider-item': SliderItem
  },
  computed: {
    ...mapGetters(['focus', 'recomPlaylist'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.recommend-content {
  width: 100vw;
  overflow: hidden;
  .focus {
    padding: 10px;
    background-image:linear-gradient($theme-color 70%, white 70%);
    .album-cover {
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
}
</style>
