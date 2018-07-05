<template>
<div id="home-page">
  <headLevel2 :pages="pages"/>
  <router-view></router-view>
  <input type="text">
</div>
</template>

<script>
import headLevel2 from '#/headLevel2/headLevel2'
export default {
  data () {
    return {
      pages: [
        {
          title: '推荐',
          link: '/discover'
        },
        {
          title: '朋友',
          link: '/discover/friends'
        }
      ]
    }
  },
  components: {
    headLevel2
  }
}
</script>

<style scoped>
.home-page {
  flex: 1;
}
</style>
