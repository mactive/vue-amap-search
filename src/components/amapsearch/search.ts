import {amapType, amapmixinApp, location, poi} from '../../mixins/amap'

import Vue from 'vue'

/**
 * props & data interface
 * 
 * @interface props
 */
interface props{
  defaultLng: number;
  defaultLat: number;
  searchCount: number;
  defaultCity: string;
  width: number;
  height: number;
  showComfirmButton: boolean;
}

/**
 * methods interface
 * 
 * @interface methods
 */
interface methods{
}

type thisVue = props & Vue & amapType;
console.log(amapmixinApp);
export default {
  name: 'amapSearch',
  data () {
    return {
      // 高德地图相关的 amapmixin 中使用的 
      autocomplateInput: '',  // 用户输入值
    }
  },
  watch:{
    autocomplateInput: function(this:thisVue, val:any, oldVal:any){
      this.$emit('userInput',val);
    }
  },
  props:{
    defaultLng: {
      type: Number,
      default: 39.90923,
      required: false
    },
    defaultLat: {
      type: Number,
      default: 116.397428,
      required: false
    },
    defaultCity:{
      type: String,
      default: '北京',
      required: false
    },
    searchCount:{
      type: Number,
      default: 1,
      required: false
    },
    width:{
      type: Number,
      required: true
    },
    height:{
      type: Number,
      required: true
    },
    showComfirmButton:{
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods:{
    setMarkerLocation(this:thisVue, location:poi){
      this.selectedPoi.isMoved = false;
      // 不做绑定
      // if(showComfirmButton)
      let loc = JSON.stringify(location);
      this.$emit('pickedLocation',JSON.parse(loc));
    }
  },
  mounted(this:thisVue){
    // // 初始化 domId
    this.initAmap('amap-container',[this.defaultLat, this.defaultLng]);
    // // 自动完成 ''代表默认全国
    this.initAutocomplate("autocomplate-input", this.searchCount, this.defaultCity );
    // 开启单击的话 会影响拖动和marker 的click 
    // TODO: 需要谨慎考虑一下
    // this.initMouseTools();
  },
  mixins:[amapmixinApp],
}