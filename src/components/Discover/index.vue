<template>
<div class="home-page">
  <headLevel2
    :pages="pages"
    :activePageIndex="activePageIndex"
  />
  <div class="page-main">
    <transition :name="toggleType">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</div>
</template>

<script>
import headLevel2 from '#/headLevel2/headLevel2'
import {mapMutations} from 'vuex'

const save = {
  saveIndex: 0 // 保证activePageIndex不为-1，避免bug
}
export default {
  name: 'Discover',
  components: {
    headLevel2
  },
  data () {
    return {
      pages: [
        {
          title: '推荐',
          link: '/discover/recommend'
        },
        {
          title: '朋友',
          link: '/discover/friends'
        },
        {
          title: '电台',
          link: '/discover/fm'
        }
      ],
      toggleType: 'slide-left'
    }
  },
  methods: {
    ...mapMutations('router', ['saveDiscover'])
  },
  computed: {
    activePageIndex () {
      let saveIndex = this.pages.findIndex(item => {
        return new RegExp('^' + item.link).test(this.$route.path)
      })
      if (saveIndex === -1) {
        return save.saveIndex
      } else {
        save.saveIndex = saveIndex
        return saveIndex
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    let toIndex = this.pages.findIndex(item => {
      return new RegExp('^' + item.link).test(to.path)
    })
    if (this.activePageIndex < toIndex) {
      this.toggleType = 'slide-left'
    } else {
      this.toggleType = 'slide-right'
    }
    next()
    this.saveDiscover(to.path)
  }
}
</script>

<style scoped>
.home-page {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.home-page > .page-main {
  flex: 1;
  position: relative;
  overflow: auto;
}
</style>
