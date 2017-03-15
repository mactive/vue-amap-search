import Vue from 'vue'

declare var AMap:any;

// public type
export type amapType = {
  /**
   * 高德返回的县区信息,District对象
   * 
   * @type {*}
   */
  amapCounty: any,
  /**
   * 唯一的高德map对象
   * 
   * @type {*}
   */
  map: any,
  /**
   * 自动完成组件实例
   * 
   * @type {*}
   */
  autocomplete: any,
  /**
   * 关键字搜索组件实例
   * 
   * @type {*}
   */
  placeSearch: any,
  /**
   * geo反查的对象
   * 
   * @type {*}
   */
  geocoder: any,
  /**
   * 用户点击确定的poi点信息 单点
   * 
   * @type {{
   *         location: {
   *             lat: number,
   *             lng: number
   *         },
   *         address: string,
   *         name: string
   *     }}
   */
  selectedPoi:{
      location: {
          lat: number,
          lng: number
      },
      address: string,
      name: string,
      isMoved: boolean
  },

  editingPolygon: {
      
  } ,      // 编辑中的 editingEditor

  mouseTool: any;

  /**
   * 初始化地图组件, document.id
   * 
   * @param {string} domContainer
   */
  initAmap(domContainer:string):void;
  /**
   * 初始化行政区域搜索(对外接口)
   * 
   * @param {string} keyword
   */
  initAMapDistrictSearch(keyword: string, callback: Function ): void;

  
  renderSearchMarker(poiList: poi[]): void;

  drawPolyAreaEditer(pathArray: polygonPoint[], color: string ):any;
}


type poi = {
    location: {
        lat: number,
        lng: number
    }
}

type polygonPoint = number[];

// TODO: 使用的袋鼠UI的inform, 今后可能要换成Vue的

const toastDelay = 2000;
const toast = function (msg: string) {
    console.log('taost' + msg);
};

export var amapmixinApp = {
    data(){
      return {
        map: {}, // map组件
        autocomplete: {}, //自动完成组件
        placeSearch: {}, // 地址搜索组件
        amapCounty: {}, // 反查出来的高德county
        geocoder:{},
        selectedPoi: {
          location: {
            lat: 0,
            lng: 0
          },
          address: '',
          name: '',
          isMoved: false
        }, 
        editingPolygon: {}, //编辑中的polygon
        mouseTool: {}
      }
    },
    mounted() {
        console.log('amapmixin mounted');
        // this.initAmap('#container-id'); // 在调用方初始化
        // this.initAutocomplate('#complate-input-id'); // 在调用方初始化
    },
    // methods: {
    //     /**
    //      * 初始化amap对象
    //      */
    //     initAmap(domContainer:any) {
    //         let vm = this;
    //         vm.map = new AMap.Map(domContainer, {
    //             resizeEnable: true,
    //             zoom: 12,
    //             center: [116.397428, 39.90923]
    //         });

    //         AMap.plugin(['AMap.ToolBar','AMap.Scale'],
    //             function(){
    //                 vm.map.addControl(new AMap.ToolBar());
    //                 vm.map.addControl(new AMap.Scale());
    //         });

    //         vm.geocoder = new AMap.Geocoder({
    //             radius: 1000,
    //             extensions: "all"
    //         });

    //         if(AMap.MouseTool){
    //             vm.mouseTool = new AMap.MouseTool(vm.map);
    //         }


    //     },

    //     /**
    //      * 初始化搜索菜单
    //      * 
    //      * @param {string} cityname
    //      */
    //     initAutocomplate(cityname: string) {
    //         console.log('cityname',cityname);
    //         let vm = this;

    //         AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
    //             var autoOptions = {
    //                 city:  cityname && '', //默认全国
    //                 input: "autocomplate-input"//使用联想输入的input的id
    //             };
    //             vm.autocomplete = new AMap.Autocomplete(autoOptions);
    //             vm.placeSearch = new AMap.PlaceSearch({
    //                 city: cityname,
    //                 map: '',
    //                 pageSize: 1
    //             })
    //             AMap.event.addListener(vm.autocomplete, "select", function(e){
    //                 //TODO 针对选中的poi实现自己的功能
    //                 console.log('autocomplate select event');
    //                 vm.autocomplateInput = e.poi.name;
                    
    //                 vm.placeSearch.search(e.poi.name, function(status,result){
    //                     if (status === 'complete' && result.info === 'OK') { 
    //                         // 清除所有覆盖物
    //                         vm.map.clearMap();
    //                         // 绘制自己的坐标点
    //                         vm.renderSearchMarker(result.poiList.pois);
    //                         // 地图自适应显示
    //                         vm.map.setFitView();
    //                         vm.map.setZoom(14);
    //                         // 清除搜索结果
    //                         vm.placeSearch.clear();
    //                     }else{
    //                         toast("没有匹配结果<br>或者结果太多");
    //                     }
                        
    //                 })

    //             });
    //         });
    //     },

    //     // 如果有一个结果, 自动设置. 如果没有让用户选择
    //     searchDefaultSuggestion(event){
    //         let vm = this;
    //         // TODO: 如果输入回车 自动blur userInput
    //         vm.placeSearch.search(this.autocomplateInput, function(status,result){

    //             if (status === 'complete' && result.info === 'OK') { 
    //                 // 清除所有覆盖物
    //                 vm.map.clearMap();
    //                 // 绘制自己的坐标点
    //                 vm.renderSearchMarker(result.poiList.pois);
    //                 // 地图自适应显示
    //                 vm.map.setFitView();
    //                 vm.map.setZoom(14);
    //                 // 清除搜索结果
    //                 vm.placeSearch.clear();
    //             } else {
    //                 toast("没有匹配结果<br>或者结果太多");
    //             }
                
    //         })
    //     },

    //     /**
    //      * 显示自定义的marker
    //      */
    //     renderSearchMarker(poiList: poi[]) {
    //         let vm = this;

    //         var infoWindow = new AMap.InfoWindow({offset:new AMap.Pixel(-9,-30)});

    //         for(let poi of poiList){
    //             var marker=new AMap.Marker({
    //                 position:poi.location,
    //                 map:vm.map,
    //                 // icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b'+(i+1)+'.png',
    //                 icon: '../../images/location_marker.png',
    //                 draggable: true
    //             });
    //             marker.content = vm.$refs["marker-content"];
    //             // 默认没有移动过
    //             marker.setExtData({isMoved: false});
    //             marker.on('click', function(e){
    //                 //  如果信息有更改
    //                 if (!this.getExtData().isMoved){
    //                     vm.selectedPoi = poi ;
    //                     vm.selectedPoi.isMoved = this.getExtData().isMoved;
    //                 }
    //                 infoWindow.setContent(e.target.content);
    //                 infoWindow.open(vm.map, e.target.getPosition());
    //             });
    //             // 触发一次click显示
    //             marker.emit('click',{target: marker});

    //             // 因为会自动触发 拖拽之后也会触发 所以在这里做检查
    //             vm.setMarkerLocation(poi.location);

    //             marker.on('dragstart', function(e){
    //                 vm.map.clearInfoWindow();
    //             });
    //             marker.on('dragend', function(e){
    //                 marker.setExtData({isMoved: true});
    //                 console.log(e.lnglat);
    //                 let lat = e.lnglat.lat,
    //                     lng = e.lnglat.lng;
    //                 marker.setPosition(new AMap.LngLat(lng,lat));

    //                 vm.geocoder.getAddress(e.lnglat, function(status, result) {
    //                     if (status === 'complete' && result.info === 'OK') {
    //                         console.log(result);
    //                         let _address = result.regeocode.addressComponent;
    //                         vm.selectedPoi = {
    //                             location: e.lnglat,
    //                             address: _address.district+_address.street+_address.streetNumber,
    //                             name: result.regeocode.formattedAddress,
    //                             isMoved: true
    //                         };
    //                         console.log(vm.selectedPoi);
    //                         marker.emit('click',{target: marker});
    //                     }
    //                 });        
    //                 // 
    //             });
    //         }
    //     },

    //     /**
    //      * 相应区域变化改变地图的中心点
    //      */
    //     initAMapDistrictSearch(keyword, callback) {
    //         let vm = this;
    //         AMap.service('AMap.DistrictSearch', function () {
    //             var opts = {
    //                 subdistrict: 1,   //返回下一级行政区
    //                 extensions: 'base',  // 不返回行政区边界坐标点
    //                 showbiz: false,
    //                 level: 'district'  //查询行政级别为 县
    //             };
    //             //实例化DistrictSearch
    //             let district = new AMap.DistrictSearch(opts);
    //             //行政区查询
    //             district.search(keyword, function (status, result) {
    //                 let county = result.districtList[0];
    //                 // 设置地图中心点
    //                 vm.map.setCenter(county.center);
    //                 vm.map.setZoom(12);
    //                 callback(county);
    //             });
    //         });
    //     },

    //     /**
    //      * 绘制多个polygonEditor
    //      * @param pathArray
    //      * @param color 
    //      */
    //     drawPolyAreaEditer(pathArray: polygonPoint[], color){
    //         let vm = this;
    //         let result = ''
    //         let _polygon = new AMap.Polygon({
    //             map: vm.map,
    //             path: pathArray,
    //             strokeColor: color,
    //             strokeOpacity: 1,
    //             strokeWeight: 2,
    //             fillColor: color,
    //             fillOpacity: 0.35
    //         });

    //         let editor = new AMap.PolyEditor(vm.map, _polygon);
    //         editor.polygon = _polygon;
            
    //         return editor;
    //     }
    // }
}
// export default amapmixinApp;