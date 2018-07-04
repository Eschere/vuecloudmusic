<template>
  <div
    class="aside-page"
    @click="toggleAside(false)"
  >
    <div class="aside-content">
      内容
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  methods: {
    ...mapMutations(['toggleAside'])
  }
}
</script>
<style lang="scss" scoped>
  .aside-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(black, 0.6);
    z-index: 1000;
    .aside-content {
      width: 80vw;
      height: 100vh;
      background: white;
    }
  }
</style>
