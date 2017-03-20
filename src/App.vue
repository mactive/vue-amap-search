<template>
  <div id="app">
    <div class="amap-search">
      <amap-search 
        :searchCount="5" 
        @userInput="handleUserInput"
        @pickedLocation="handlePickedLocation">
      </amap-search>
    </div>
    
    <h3>高德gcj02 坐标系</h3>
    <p><code>用户输入 </code> {{userInput}}</p>
    <p><code>用户点击确定后的经纬度</code> {{pickedLocation.lat}},{{pickedLocation.lng}}</p>
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
