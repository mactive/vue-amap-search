"use strict";
/**
 * dev 使用, 直接修改源文件
 */
var search_vue_1 = require("./components/amapsearch/search.vue");
var MrRight = {
    name: 'Mr. Right'
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'app',
    data: function () {
        return {
            msg: 'Welcome to Your Vue.js App --- ' + MrRight.name,
            userInput: '',
            pickedLocation: {
                location: {}
            }
        };
    },
    methods: {
        handleUserInput: function (_input) {
            this.userInput = _input;
        },
        handlePickedLocation: function (location) {
            this.pickedLocation = location;
        }
    },
    components: {
        amapSearch: search_vue_1.default
    }
};
