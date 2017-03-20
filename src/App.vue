<template>
  <div id="app">
    <div class="amap-search">
      <amap-search :searchCount="5">
      </amap-search>
    </div>
  </div>
</template>

<script>
module.exports = require('./App.ts').default
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.amap-search{
  position: relative;
  width: 800px;
  height: 540px;
  margin: 0 auto;
}
</style>
