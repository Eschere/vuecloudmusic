<template>
  <transition name="shade">
    <v-touch
      class="shade"
      v-if="shade"
      @tap="close"
      ref="shade"
    >
      <slot></slot>
    </v-touch>
  </transition>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  props: {
    shade: {
      default: false
    },
    closeOnclickModal: {
      default: true
    }
  },
  methods: {
    ...mapMutations(['changeOverlayState']),
    close (e) {
      if (this.closeOnclickModal && e.target === this.$refs.shade.$el) {
        this.$emit('close')
      }
    },
    closeShade (e) {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      this.$emit('close')
    }
  },
  watch: {
    shade (val) {
      if (val) {
        this.changeOverlayState(true)
        document.addEventListener('backbutton', this.closeShade, false)
      } else {
        this.changeOverlayState(false)
        document.removeEventListener('backbutton', this.closeShade, false)
      }
    }
  }
}
</script>

<style>
.shade{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  z-index: 1000;
}

.shade-enter,
.shade-leave-to {
  background: rgba(0, 0, 0, 0);
}
.shade-enter-active,
.shade-leave-active {
  transition: all 0.3s;
}
</style>
