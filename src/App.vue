<template>
  <header1 />
  <router-view />
  <footer1 />
</template>

<script>

import header1 from './components/header-bar.vue'
import footer1 from './components/footer-bar.vue'
export default {
  name: 'App',
  components: {
    header1,
    footer1
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
