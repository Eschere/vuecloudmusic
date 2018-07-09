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
  components: {
    headLevel2
  },
  data () {
    return {
      pages: [
        {
          title: '推荐',
          link: '/video/recommend'
        },
        {
          title: '音乐',
          link: '/video/music'
        },
        {
          title: 'Showtime',
          link: '/video/showtime'
        },
        {
          title: 'MV',
          link: '/video/mv'
        },
        {
          title: '二次元',
          link: '/video/2d'
        },
        {
          title: '舞蹈',
          link: '/video/dance'
        },
        {
          title: '游戏',
          link: '/video/game'
        }
      ],
      toggleType: 'slide-left'
    }
  },
  methods: {
    ...mapMutations('router', ['saveVideo'])
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
  // beforeRouteEnter (to, from, next) {
  //   let saveIndex = save.saveIndex
  //   next(vm => {
  //     vm.$router.replace(vm.pages[saveIndex].link)
  //   })
  // },
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
    this.saveVideo(to.path)
  }
}
</script>

<style scoped>
.home-page {
  overflow: hidden;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.home-page > .page-main {
  flex: 1;
  position: relative;
  overflow: hidden;
}
</style>
