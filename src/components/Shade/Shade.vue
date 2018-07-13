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
export default {
  props: {
    shade: {
      default: false
    }
  },
  methods: {
    close (e) {
      if (e.target === this.$refs.shade.$el) this.$emit('close')
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
  transition: all 0.4s;
}
</style>
