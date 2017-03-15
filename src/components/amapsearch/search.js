"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amap_1 = require("../../mixins/amap");
console.log(amap_1.amapmixinApp);
exports.default = {
    name: 'amapSearch',
    data: function () {
        return {
            // 高德地图相关的 amapmixin 中使用的 
            autocomplateInput: '',
        };
    },
    methods: {
        setMarkerLocation: function (location) {
            console.log(location.lng, location.lat);
        }
    },
    mounted: function () {
        console.log('search mounted');
        // // 初始化 domId
        this.initAmap('amap-container', [116.397428, 39.90923]);
        // // 自动完成 ''代表默认全国
        this.initAutocomplate("autocomplate-input", 4, '北京');
    },
    mixins: [amap_1.amapmixinApp],
};
