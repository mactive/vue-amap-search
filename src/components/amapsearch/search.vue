<template>
  <div class="map-container">
    <!--自动输入框-->
    <div class="autocomplate-container">
        <input type="text" v-model="autocomplateInput" id="autocomplate-input" 
        placeholder="输入详细地址,越详细定位越精准"/>
        <button @click="searchDefaultSuggestion">
            搜索
        </button>
    </div>

    <!--自定义的窗体 marker-content -->
    <div ref="marker-content" class="marker-content" v-show="selectedPoi.location">
      <div class="marker-content-header">
          <div class="marker-circle"><span class="fa fa-check"></span></div>
          <span class="notice">已将坐标定位为</span>
      </div>
      <div class="marker-info">
          <div class="marker-name">{{selectedPoi.name}}</div>
          <div class="marker-address">{{selectedPoi.address}}</div>
      </div>
      <a class="btn btn-success" @click="setMarkerLocation(selectedPoi.location)">确定</a>
    </div>

    <!--地图容器-->
    <div id="amap-container"></div>
  </div>
</template>

<script>
module.exports = require('./search.ts').default
</script>

<style lang="scss">
.map-container{
  position: relative;
  width: inherit;
  height: inherit;
}

#amap-container{
  width: inherit;
  height: inherit;
}

.autocomplate-container {
  width: 50%;
  z-index: 20;
  background-color: #ddf;
  color: #333;
  box-shadow: 0px 2px 4px 0px silver;
  position: absolute;
  top: 10px;
  left: 25%;
  border-radius: 5px;
  overflow: hidden;
  line-height: 20px;
  border-radius: 5px;
  height: 34px;
  line-height: 34px;


  input[type="text"] {
    height: 25px;
    border: 0;
    width: 360px;
    outline: none;
    height: inherit;
    line-height: inherit;
    font-size: 14px;
    padding-left: 15px;
    border-radius: 5px 0px 0px 5px;
    &:focus{
      border: none !important;
    }
  }

  button {
    background: #06C1AE;
    color: #fff;
    border:0;
    float:right;
    width: 40px;
    height: inherit;
    font-size: 12px;
    line-height: inherit;
  }
}


.amap-sug-result {
  border-radius: 5px;
  box-shadow: 0px 2px 4px 0px silver;
  border: none;

  .auto-item{
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    .auto-item-span{
      
    }
  }
}

.marker-content{
  .marker-content-header{
    border-bottom: 1px solid #E5E5E5;
    height: 24px;
    background: none;
    .marker-circle{
      background: #99D465;
      height: 18px;
      width: 18px;
      border-radius: 9px;
      color: #fff;
      float: left;
      text-align: center;
      span{
        line-height: 18px;
        width: 18px;
      }
    }
    .notice{
      float: left;
      margin-left: 10px;
    }
  }
  .marker-info{
    padding-top: 10px;
    .marker-name {
      font-size: 15px;
    }
    .marker-address {
      padding: 5px 0px;
      font-size: 12px;
      color: #a0a0a0;
    }
  }
}

/*重写高德css*/
.amap-info-outer{
  border-radius: 5px !important; 
  border: none !important;
}

.amap-info-sharp{
  background-image: url(/images/marker_drop.png) !important;
  height: 13px !important;
  background-repeat: no-repeat !important;
  top: -3px  !important;
}
</style>