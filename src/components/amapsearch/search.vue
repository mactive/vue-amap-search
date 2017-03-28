<template>
  <div class="amap-search__container" :style="{width: width + 'px',height: height + 'px'}">
    <!--自动输入框-->
    <div class="amap-search__autocomplate">
        <input type="text" v-model="autocomplateInput" id="autocomplate-input" 
        @keyup.enter="searchDefaultSuggestion" autocomplete="off"
        placeholder="输入详细地址,越详细定位越精准"/>
        <a class="amap-search__search-btn" @click="searchDefaultSuggestion">
            搜索
        </a>
    </div>

    <!--自定义的窗体 marker-content -->
    <div ref="marker-content" class="marker-content" v-show="selectedPoi.location.lat">
      <div class="marker-content-header">
          <span v-show="selectedPoi.isMoved==false" class="notice-icon">&#9873;</span>
          <span v-show="selectedPoi.isMoved==false" class="notice">已将坐标定位为</span>
          <span v-show="selectedPoi.isMoved" class="notice">坐标定位</span>
      </div>
      <div class="marker-info">
          <div class="marker-name">{{selectedPoi.name}}</div>
          <div class="marker-address">{{selectedPoi.address}}</div>
      </div>
      <a v-show="selectedPoi.isMoved" class="amap-search__confirm-btn" @click="setMarkerLocation(selectedPoi)">确定</a>
    </div>

    <!--地图容器-->
    <div id="amap-container"></div>
  </div>
</template>

<script>
module.exports = require('./search.ts').default
</script>

<style lang="less">
#amap-container{
  width: inherit;
  height: inherit;
}

.amap-search__container{
  position: relative;
  width: inherit;
  height: inherit;
  margin: 0 auto;
}

.amap-search__autocomplate {
  width: 400px;
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
  display: flex;
  flex: 1;
  justify-content:stretch;

  input[type="text"] {
    height: 25px;
    border: 0;
    width: auto;
    outline: none;
    height: inherit;
    line-height: inherit;
    font-size: 14px;
    padding-left: 15px;
    border-radius: 5px 0px 0px 5px;
    flex: 1;
    &:focus{
      border: none !important;
    }
  }

  a.amap-search__search-btn {
    background: #06C1AE;
    color: #fff;
    border:0;
    width: 40px;
    height: inherit;
    font-size: 12px;
    line-height: inherit;
  }
}

a.amap-search__confirm-btn{
  background: #06C1AE;
  color: #fff;
  border:0;
  min-width: 40px;
  text-align: center;
  font-size: 12px;
  height: 34px;
  line-height: 34px;
  padding:0px 10px;
  display: inline-block;
  border-radius: 5px;
}
/* 弹出信息窗体 */
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
    .notice-icon{
      color: #06C1AE;
      margin-right: 8px;
    }
    .notice{
      font-size: 12px;
      font-weight: bold;
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

.amap-sug-result {
  border-radius: 5px;
  box-shadow: 0px 2px 4px 0px silver;
  border: none;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  .auto-item{
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    padding-left: 15px;
    .auto-item-span{
      // 提示灰色文字
    }
  }
}

.amap-info-outer{
  border-radius: 5px !important; 
  border: none !important;
}

// .amap-info-sharp{
//   background-image: url(/images/marker_drop.png) !important;
//   height: 13px !important;
//   background-repeat: no-repeat !important;
//   top: -3px  !important;
// }

</style>