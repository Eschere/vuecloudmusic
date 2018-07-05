<template>
  <div class="head-l2">
    <router-link
    tag="span"
      v-for="page in pages"
      :key="page.link"
      :to="page.link"
    >{{ page.title }}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.head-l2 {
  height: 50px;
}
</style>
