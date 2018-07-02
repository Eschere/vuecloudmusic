<template>
  <div id="app">
    <button @click="playlist">playlist</button>
  </div>
</template>

<script>
import jsonp from 'jsonp'
function url (path) {
  return `http://localhost:8080${path}`
}
export default {
  methods: {
    playlist () {
      jsonp(url('/playlist'), {
        name: 'recom0289'
      }, (err, data) => {
        if (err) console.log(err)
        else console.log(data)
      })
    }
  }
}
</script>
