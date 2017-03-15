"use strict";
// TODO: 使用的袋鼠UI的inform, 今后可能要换成Vue的
var toastDelay = 2000;
var toast = function (msg) {
    console.log('taost' + msg);
};
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
                isMoved: false
            },
            editingPolygon: {},
            mouseTool: {}
        };
    },
    mounted: function () {
        console.log('amapmixin mounted');
        // this.initAmap('#container-id'); // 在调用方初始化
        // this.initAutocomplate('#complate-input-id'); // 在调用方初始化
    },
};
// export default amapmixinApp; 
