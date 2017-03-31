# vue-amap-search

> A Vue.js amap 高德地图搜索功能组件

## Demo

http://www.devmeng.com/vue-amap-search/

## 如何使用

1. 引入高德地图 .js 文件, 注意需要配置参数和你的高德key
> 例如: `<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&plugin=AMap.Geocoder&key=你的高德地图key"></script>`
因为我们用到了地址->poi反查,所以要用到`plugin=AMap.Geocoder` 

2. 导入js和css,声明component

单一组件内部使用
```javascript
import AmapSearch from 'vue-amap-search'
import 'vue-amap-search/dist/lib/main.css'

export default {
  // 省略
  components:{
      'amap-search': AmapSearch
  }
}
```
or 全局声明

```javascript
import Vue from 'vue'
import AmapSearch from 'vue-amap-search'
import 'vue-amap-search/dist/vue-instant.css'
Vue.use(AmapSearch)
```

html 中使用都是一样的,及得给amap-search设定宽和高,
```html
<amap-search 
  :searchCount="2"
  :autoConfirm="false"
  :useClick="true"
  :width="800"
  :height="340"
  @userInput="handleUserInput"
  @pickedLocation="handlePickedLocation">
</amap-search>
```

3. event and props

### props
* width 宽度
  height 高度
* searchCount 返回结果的数量
* autoConfirm 是否自动确认点的地址, 默认 false 不开启 . 
> 默认false, 用户点击确定后才会触发 handlePickedLocation 绑定的事件
> 如果true,searchCount 会自动变成1
* useClick 是否开启用户单机地图, 默认 false 不开启 . 
> 默认false, 用户点击地图没有反应, 只能搜索结果后拖动图标
> 如果true,searchCount 会自动变成1


### Event
* handleUserInput 输入框中的值
* handlePickedLocation 用户选定坐标,并点击确定后的值



## TODO: 
- [x] 传入宽和高
- [x] 样式自包含, 不依赖于 bootstrap 3.3版本
- [x] 自动完成鼠标上下选择第三下失效.
- [x] 支持手点位置, 但是只能有一个搜索结果结果
- [x] 去掉sass 改用postcss
- [x] 支持开关确认按钮, 点击确定关闭
- [x] BUG: 拖动POI显示时候错位的问题, 应该是显示的问题
- [x] 做成 amap-search 组件, 组件的实现可以用到mixin
- [x] 优化 webpack task
- [ ] 输出组件的ts定义 d.ts文件



## Build Setup 二次开发或者fork

``` bash

# 先安装typescript 然后 link
npm install typescript -g
npm link typescript

# install dependencies
npm install

# serve with hot reload at localhost:3030
npm run dev

# build for vue component with js, css with sourcemaps
npm run build:lib

# build for example project with vue framework in
npm run build:example



```
