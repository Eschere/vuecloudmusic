<template>
  <div :class="loaded ? '' : beforeload">
    <img style="width:100%" v-if="loaded" :src="src">
  </div>
</template>

<script>
export default {
  data () {
    return {
      loaded: false
    }
  },
  props: ['beforeload', 'src'],
  created () {
    let img = new Image()
    img.src = this.src
    img.onload = () => {
      this.loaded = true
    }
  }
}
</script>
