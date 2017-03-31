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
    watch: {
        autocomplateInput: function (val, oldVal) {
            this.$emit('userInput', val);
        },
        'selectedPoi.location.lat': function selectedPoiLocation(newVal, oldVal) {
            /**
             * 如果不显示确定按钮, 拖到那里是哪里的话,
             * searchCount 默认为1
             */
            if (this.autoConfirm) {
                this.selectedPoi.isMoved = false;
                var loc = JSON.stringify(this.selectedPoi);
                this.$emit('pickedLocation', JSON.parse(loc));
            }
        }
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
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        autoConfirm: {
            type: Boolean,
            default: false,
            required: false
        },
        useClick: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    methods: {
        setMarkerLocation: function () {
            if (this.autoConfirm == false) {
                this.selectedPoi.isMoved = false;
                var loc = JSON.stringify(this.selectedPoi);
                this.$emit('pickedLocation', JSON.parse(loc));
            }
        }
    },
    mounted: function () {
        // 初始化 domId
        this.initAmap('amap-container', [this.defaultLat, this.defaultLng]);
        /**
         * 如果不显示确定按钮, 拖到那里是哪里的话,
         * searchCount 默认为1
         */
        var searchCount = this.autoConfirm ? 1 : this.searchCount;
        /**
         * 如果支持用户点击, 点在哪里是哪里
         * searchCount 默认为1
         */
        if (this.useClick) {
            this.initMouseTools();
            searchCount = 1;
        }
        // 初始化 自动完成 domId ''代表默认全国
        this.initAutocomplate("autocomplate-input", searchCount, this.defaultCity);
    },
    mixins: [amap_1.amapmixinApp],
};
