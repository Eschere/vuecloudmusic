<template>
<detailPage
  v-bind="$attrs"
>
<div>
  内容
</div>
</detailPage>
</template>

<script>
import detailPage from '#/common/detailFramework2'
export default {
  // props:['title', 'subTitle', 'cover'],
  components: {
    detailPage
  }
  // created(){
  //   console.log(this)
  // }
}
</script>

