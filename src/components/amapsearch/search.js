"use strict";
var amap_1 = require("../../mixins/amap");
console.log(amap_1.amapmixinApp);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'amapSearch',
    data: function () {
        return {
            // 高德地图相关的 amapmixin 中使用的 
            autocomplateInput: '222',
            amapLocation: {},
        };
    },
    mounted: function () {
        console.log('search mounted');
        console.log(this.map);
        // // 初始化 domId
        // this.initAmap('amap-container');
        // // 自动完成 ''代表默认全国
        // this.initAutocomplate('');
    },
    mixins: [amap_1.amapmixinApp],
};
