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
  autoConfirm: boolean;
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
    },
    'selectedPoi.location.lat': function selectedPoiLocation(this:thisVue, newVal:location,oldVal:location){
      /**
       * 如果不显示确定按钮, 拖到那里是哪里的话, 
       * searchCount 默认为1
       */
      if(this.autoConfirm){
        this.selectedPoi.isMoved = false;
        let loc = JSON.stringify(this.selectedPoi);
        this.$emit('pickedLocation',JSON.parse(loc));
      }
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
    autoConfirm:{
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods:{
    setMarkerLocation(this:thisVue){
      if(this.autoConfirm == false){
        this.selectedPoi.isMoved = false;
        let loc = JSON.stringify(this.selectedPoi);
        this.$emit('pickedLocation',JSON.parse(loc));
      }
    }
  },
  mounted(this:thisVue){
    // 初始化 domId
    this.initAmap('amap-container',[this.defaultLat, this.defaultLng]);

    /**
     * 如果不显示确定按钮, 拖到那里是哪里的话, 
     * searchCount 默认为1
     */
    let searchCount = this.autoConfirm ? 1 : this.searchCount;

    // 初始化 自动完成 ''代表默认全国
    this.initAutocomplate("autocomplate-input", searchCount, this.defaultCity );

    // 开启单击的话 会影响拖动和marker 的click 
    // TODO: 需要谨慎考虑一下
    // this.initMouseTools();
  },
  mixins:[amapmixinApp],
}