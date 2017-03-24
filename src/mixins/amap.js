"use strict";
exports.amapmixinApp = {
    data: function () {
        return {
            map: {},
            autocomplete: {},
            placeSearch: {},
            amapCounty: {},
            geocoder: {},
            selectedPoi: {
                location: {
                    lat: 0,
                    lng: 0
                },
                address: '',
                name: '',
                isMoved: true
            },
            editingPolygon: {},
            mouseTool: {}
        };
    },
    mounted: function () {
        console.log('amapmixin mounted');
    },
    methods: {
        /**
         * 初始化amap对象
         */
        initAmap: function (domContainer, mapCenter) {
            var vm = this;
            vm.map = new AMap.Map(domContainer, {
                resizeEnable: true,
                zoom: 12,
                center: mapCenter
            });
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                vm.map.addControl(new AMap.ToolBar());
                vm.map.addControl(new AMap.Scale());
            });
            vm.geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            if (AMap.MouseTool) {
                vm.mouseTool = new AMap.MouseTool(vm.map);
            }
        },
        /**
         * 初始化搜索菜单
         *
         * @param {string} cityname
         */
        initAutocomplate: function (domContainer, pageSize, cityname) {
            console.log('cityname', cityname);
            var vm = this;
            AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
                var autoOptions = {
                    city: cityname && '',
                    input: domContainer //使用联想输入的input的id
                };
                vm.autocomplete = new AMap.Autocomplete(autoOptions);
                vm.placeSearch = new AMap.PlaceSearch({
                    city: cityname,
                    map: '',
                    pageSize: pageSize
                });
                AMap.event.addListener(vm.autocomplete, "select", function (e) {
                    //TODO 针对选中的poi实现自己的功能
                    console.log('autocomplate select event');
                    vm.autocomplateInput = e.poi.name;
                    vm.placeSearch.search(e.poi.name, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            // 清除所有覆盖物
                            vm.map.clearMap();
                            // 绘制自己的坐标点
                            vm.renderSearchMarker(result.poiList.pois);
                            // 地图自适应显示
                            vm.map.setFitView();
                            vm.map.setZoom(14);
                            // 清除搜索结果
                            vm.placeSearch.clear();
                        }
                        else {
                            console.log("没有匹配结果<br>或者结果太多");
                        }
                    });
                });
            });
        },
        /**
         * 地图鼠标单击事件
         */
        initMouseTools: function () {
            var vm = this;
            vm.mouseTool.marker();
            vm.mouseTool.on('draw', function (data) {
                vm.map.clearMap();
                var position = data.obj.getPosition();
                vm.geocoder.getAddress(position, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        console.log(result);
                        var _address = result.regeocode.addressComponent;
                        var poi = {
                            location: position,
                            address: _address.district + _address.street + _address.streetNumber,
                            name: result.regeocode.formattedAddress
                        };
                        vm.renderSearchMarker([poi], true);
                    }
                });
            });
        },
        // 如果有一个结果, 自动设置. 如果没有让用户选择
        searchDefaultSuggestion: function (event) {
            var vm = this;
            // TODO: 如果输入回车 自动blur userInput
            vm.placeSearch.search(this.autocomplateInput, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // 清除所有覆盖物
                    vm.map.clearMap();
                    // 绘制自己的坐标点
                    vm.renderSearchMarker(result.poiList.pois);
                    // 地图自适应显示
                    vm.map.setFitView();
                    vm.map.setZoom(14);
                    // 清除搜索结果
                    vm.placeSearch.clear();
                }
                else {
                    console.log("没有匹配结果<br>或者结果太多");
                }
            });
        },
        /**
         * 显示自定义的marker
         */
        renderSearchMarker: function (poiList) {
            var vm = this;
            var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
            var poiIndex = 0;
            var _loop_1 = function (poi) {
                poiIndex++;
                marker = new AMap.Marker({
                    position: poi.location,
                    map: vm.map,
                    icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r' + (poiIndex) + '.png',
                    draggable: true
                });
                marker.content = vm.$refs["marker-content"];
                // 默认没有移动过
                marker.setExtData({ isMoved: true, poiIndex: poiIndex });
                marker.on('click', function (e) {
                    //  如果信息有更改
                    vm.selectedPoi.location = poi.location;
                    vm.selectedPoi.address = poi.address;
                    vm.selectedPoi.name = poi.name;
                    vm.selectedPoi.isMoved = this.getExtData().isMoved;
                    infoWindow.setContent(e.target.content);
                    infoWindow.open(vm.map, e.target.getPosition());
                });
                // 触发一次click显示
                marker.emit('click', { target: marker });
                // 因为会自动触发 拖拽之后也会触发 所以在这里做检查
                // vm.setMarkerLocation(poi);
                marker.on('dragstart', function (e) {
                    vm.map.clearInfoWindow();
                });
                marker.on('dragend', function (e) {
                    var that = this;
                    console.log(e.lnglat);
                    that.setExtData({ isMoved: true });
                    var lat = e.lnglat.lat, lng = e.lnglat.lng;
                    that.setPosition(new AMap.LngLat(lng, lat));
                    vm.geocoder.getAddress(e.lnglat, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            console.log(result);
                            var _address = result.regeocode.addressComponent;
                            vm.selectedPoi.location = e.lnglat;
                            vm.selectedPoi.address = _address.district + _address.street + _address.streetNumber;
                            vm.selectedPoi.name = result.regeocode.formattedAddress;
                            vm.selectedPoi.isMoved = that.getExtData().isMoved;
                            console.log(vm.selectedPoi.name);
                            infoWindow.setContent(e.target.content);
                            infoWindow.open(vm.map, e.target.getPosition());
                        }
                    });
                    // 
                });
            };
            var marker;
            for (var _i = 0, poiList_1 = poiList; _i < poiList_1.length; _i++) {
                var poi = poiList_1[_i];
                _loop_1(poi);
            }
        },
        /**
         * TODO:下一步功能
         * 改变行政区划的时候改变相应的区域
         * 用户选择北京的时候, 直接改变区域中心点
         */
        initAMapDistrictSearch: function (keyword, callback) {
            var vm = this;
            AMap.service('AMap.DistrictSearch', function () {
                var opts = {
                    subdistrict: 1,
                    extensions: 'base',
                    showbiz: false,
                    level: 'district' //查询行政级别为 县
                };
                //实例化DistrictSearch
                var district = new AMap.DistrictSearch(opts);
                //行政区查询
                district.search(keyword, function (status, result) {
                    var county = result.districtList[0];
                    // 设置地图中心点
                    vm.map.setCenter(county.center);
                    vm.map.setZoom(12);
                    callback(county);
                });
            });
        },
    }
};
