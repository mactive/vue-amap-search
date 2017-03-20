# vue-typescript-realtime

> A Vue.js project

## dev todo
- [ ] 做成 amap-search 组件, 组件的实现可以用到mixin
- [ ] 两个webpacktask, one for build, one for example
- [ ] BUG: 拖动POI显示时候错位的问题, 应该是显示的问题
- [ ] 输出单独的组件.js 不含
- [ ] 单数输出css文件 和 组件本身
- [ ] 输出组件的ts定义 d.ts文件
- [ ] 整理目录符合components的规范
- [ ] 使用av-ts 或者 vue-class-component 来编写
- [ ] 搞清楚这些注解都是些什么关系

## 如何使用

1. 引入高德地图 .js 文件, 注意需要配置参数和你的高德key
> 例如: `<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&plugin=AMap.Geocoder&key=你的高德地图key"></script>`
因为我们用到了地址->poi反查,所以要用到`plugin=AMap.Geocoder` 

2. 完整的示例在 search.vue和search.ts 中

`search.vue`中是自定义的dom结构(自动完成和弹出窗体)和自定义的css样式, 需要引入bootstrap或者类bs样式库

`search.ts` 中需要mounted中初始化两个方法(传入domId和poi数量的参数), 另外你可以在setMarkerLocation 函数中获得确定之后的经纬度信息

## Build Setup

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

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
