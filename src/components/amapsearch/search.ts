import {amapType, amapmixinApp} from '../../mixins/amap'

import Vue from 'vue'

// data interface
interface that {
  name: string;
}

// method interface

type thisVue = that & Vue & amapType;
console.log(amapmixinApp);
export default {
  name: 'amapSearch',
  data () {
    return {
      // 高德地图相关的 amapmixin 中使用的 
      autocomplateInput: '222',  // 用户输入值
      amapLocation: {},       // 经纬度信息
    }
  },
  mounted(this:thisVue){
    console.log('search mounted');
    console.log(this.map);
    // // 初始化 domId
    // this.initAmap('amap-container');
    // // 自动完成 ''代表默认全国
    // this.initAutocomplate('');
  },
  mixins:[amapmixinApp],
}