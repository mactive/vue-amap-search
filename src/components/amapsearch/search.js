"use strict";
var amap_1 = require("../../mixins/amap");
console.log(amap_1.amapmixinApp);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'amapSearch',
    data: function () {
        return {
            // 高德地图相关的 amapmixin 中使用的 
            autocomplateInput: '',
        };
    },
    props: {
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
        defaultCity: {
            type: String,
            default: '北京',
            required: false
        },
        searchCount: {
            type: Number,
            default: 1,
            required: false
        }
    },
    methods: {
        setMarkerLocation: function (location) {
            this.$emit('setMarker', location);
            console.log(location.lng, location.lat);
        }
    },
    mounted: function () {
        console.log(this.searchCount);
        // // 初始化 domId
        this.initAmap('amap-container', [this.defaultLat, this.defaultLng]);
        // // 自动完成 ''代表默认全国
        this.initAutocomplate("autocomplate-input", this.searchCount, this.defaultCity);
    },
    mixins: [amap_1.amapmixinApp],
};
