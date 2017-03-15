import {amapType, amapmixinApp, location} from '../../mixins/amap'

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
      autocomplateInput: '',  // 用户输入值
    }
  },
  methods:{
    setMarkerLocation(location:location){
      console.log(location.lng, location.lat);
    }
  },
  mounted(this:thisVue){
    console.log('search mounted');
    // // 初始化 domId
    this.initAmap('amap-container',[116.397428, 39.90923]);
    // // 自动完成 ''代表默认全国
    this.initAutocomplate("autocomplate-input", 4);
  },
  mixins:[amapmixinApp],
}