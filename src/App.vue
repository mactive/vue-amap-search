<template>
  <div id="app">
    <amap-search 
      :searchCount="2"
      :autoConfirm="false"
      :useClick="true"
      :width="800"
      :height="340"
      @userInput="handleUserInput"
      @pickedLocation="handlePickedLocation">
    </amap-search>
    
    <h3>高德gcj02 坐标系22</h3>
    <p>输入出现搜索结果, 地图上的点可以拖动, 拖动后的结果信息会出现在下方</p>
    <p><code>用户输入 </code> {{userInput}}</p>
    <p><code>用户点击确定后的经纬度</code> {{pickedLocation.location.lat}},{{pickedLocation.location.lng}}</p>
    <p><code>用户点击确定后的位置</code> {{pickedLocation.name}}</p>
    <p><code>用户点击确定后的位置</code> {{pickedLocation.address}}</p>
  </div>
</template>

<script>
module.exports = require('./App.ts').default
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
code{
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}
</style>
