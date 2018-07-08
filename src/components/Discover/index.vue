<template>
<div class="home-page">
  <headLevel2
    :pages="pages"
    :activePageIndex="activePageIndex"
  />
  <transition :name="toggleType">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</div>
</template>

<script>
import headLevel2 from '#/headLevel2/headLevel2'
const save = {
  saveIndex: 0 // 保证activePageIndex不为-1，避免bug
}
export default {
  name: 'Discover',
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
  components: {
    headLevel2
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
  beforeRouteEnter (to, from, next) {
    let saveIndex = save.saveIndex
    next(vm => {
      vm.$router.replace(vm.pages[saveIndex].link)
    })
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
  }
}
</script>

<style scoped>
.home-page {
  flex: 1;
  overflow: hidden;
  width: 100vw;
}
</style>
