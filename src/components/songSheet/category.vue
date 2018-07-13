<template>
<detail-page
  title="选择分类"
>
  <div class="category-table">
    <div class="category-all-box">
      <v-touch
        :class="{selected: category.categoryId === tags[0].items[0].categoryId}"
        @tap="back(tags[0].items[0])"
        class="category-all"
      >
        {{tags.length?tags[0].items[0].categoryName:''}}
      </v-touch>
    </div>

    <div class="category-group"
      v-for="(tag,i) in tags.slice(1)"
      :key="'cgn'+tag.categoryGroupName"
    >
      <div
        class="category-title"
        :group="i"
        :class="{'bottom-border': tag.items.length > 6}"
      >
        <i class="title-bg"></i>
        <span class="title-text">{{tag.categoryGroupName}}</span>
      </div>
      <v-touch
        v-for="(item,index) in tag.items"
        @tap="back(item)"
        class="category-item"
        :key="'ctgyid'+item.categoryId"
        v-html="item.categoryName"
        :class="[borderObj(index, tag.items.length), {'selected': category === item}]"
      >
      </v-touch>
    </div>
  </div>
</detail-page>
</template>

<script>
import detailPage from '#/common/detailFramework'
import {mapState, mapMutations} from 'vuex'

export default {
  components: {
    detailPage
  },
  computed: {
    ...mapState('songSheet', ['category', 'tags'])
  },
  methods: {
    ...mapMutations('songSheet', {
      change: 'changeCategory'
    }),
    borderObj (index, length) {
      // 根据位置计算border样式
      let obj = {}
      if (index === 2 || index === 5) obj['no-right-border'] = true

      if (length <= 6) {
        if (index === 3 || index === 4 || index === 5) obj['no-bottom-border'] = true
      }
      if (index >= 6) {
        if ((index - 6) % 4 === 3) {
          obj['no-right-border'] = true
        }
        let more = (length - 6) % 4
        if (more === 0) more = 4
        if (index >= length - more) {
          obj['no-bottom-border'] = true
        }
      }
      return obj
    },
    back (e) {
      this.change(e)
      this.$router.go(-1)
    }
  }
  // watch: {
  //   category () {
  //     this.$router.go(-1)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.category-table {
  text-align: center;
  background-color: rgba(#eee, 0.2);
}

.selected {
  border: none;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: {
      width: 1.5px 22px 22px 1.5px;
      style: solid;
      color: transparent;
      image: {
        source: url('~@/components/common/img/selected.png');
        slice: 4 61 61 4;
        repeat: repeat;
      }
    }
  }
}
.category-all-box {
  background: white;
  overflow: hidden;
}
.category-all {
  height: 40px;
  margin: 5px;
  position: relative;
  line-height: 40px;
  font-size: 14px;
}
.category-group {
  margin: 10px 0;
  background: white;
  overflow: hidden;
  font-size: 13px;

  $border-color: #eee;
  .category-title {
    float: left;
    height: 80px;
    width: (1/4 * 100) + vw;
    border-right: 0.1px solid $border-color;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f39a96;
    .title-bg {
      width: 26px;
      height: 26px;
      margin-bottom: 5px;
      background: {
        position: center;
        size: 100%;
        repeat: no-repeat;
      }
    }
    @mixin group ($index, $url) {
    &[group='#{$index}'] > .title-bg{
        background-image: url($url);
      }
    }
    @include group(0, '~@/components/common/img/language.png');
    @include group(1, '~@/components/common/img/style.png');
    @include group(2, '~@/components/common/img/theme.png');
    @include group(3, '~@/components/common/img/mood.png');
    @include group(4, '~@/components/common/img/scene.png');
  }
  .category-item {
    position: relative;
    float: left;
    width: (1/4 * 100) + vw;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-right: 0.1px solid $border-color;
    border-bottom:0.1px solid $border-color;
  }
  .no-right-border {
    border-right: none;
  }
  .no-left-border {
    border-left: none;
  }
  .no-bottom-border {
    border-bottom: none;
  }
  .bottom-border {
    border-bottom: 0.1px solid $border-color;
  }
}
</style>
