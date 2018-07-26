<template>
  <Shade
    :shade="asideOn"
    @close="toggleAside(false)"
  >
    <v-touch class="aside-content">
      <div>
        内容以<br><br>
      </div>
      <div>
        <v-touch @tap="toggleAside(false)">10</v-touch>
      </div>
    </v-touch>
  </Shade>
</template>
<script>
import Shade from '#/Shade/Shade'
import {mapState, mapMutations} from 'vuex'

export default {
  components: {
    Shade
  },
  computed: {
    ...mapState(['asideOn'])
  },
  methods: {
    ...mapMutations(['toggleAside'])
  }
}
</script>

<style lang="scss" scoped>

.aside-content {
  width: 80vw;
  height: 100vh;
  background: white;
  overflow: auto;
}

.shade-enter .aside-content,
.shade-leave-to .aside-content{
  transform: translate3d(-100%,0,0);
}
.shade-enter-active .aside-content,
.shade-leave-active .aside-content {
  transition: all 0.3s;
}
</style>
