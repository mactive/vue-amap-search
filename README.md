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
<div class="amap-search">
  <amap-search 
    :searchCount="5" 
    @userInput="handleUserInput"
    @pickedLocation="handlePickedLocation">
  </amap-search>
</div>
```

3. event and props

* 需要给amap-search设定宽和高, css
* searchCount 返回结果的数量
* 需要自己实现 handleUserInput 输入框中的值,和 handlePickedLocation 用户选定坐标,并点击确定后的值



## TODO: 
- [ ] 支持手点位置
- [ ] 传入宽和高
- [ ] 支持开关确认按钮
- [ ] 引入toast显示
- [ ] 做成 amap-search 组件, 组件的实现可以用到mixin
- [ ] 优化 webpack task
- [ ] BUG: 拖动POI显示时候错位的问题, 应该是显示的问题
- [ ] 输出组件的ts定义 d.ts文件
- [ ] 整理目录符合components的规范



## Build Setup 二次开发或者fork

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for example project with minification
npm run example

# build for vue component with minification
npm run build

```
