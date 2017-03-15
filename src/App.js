"use strict";
var search_vue_1 = require("./components/amapsearch/search.vue");
var tt = {
    name: 'Mr. Right'
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'app',
    data: function () {
        return {
            msg: 'Welcome to Your Vue.js App --- ' + tt.name
        };
    },
    components: {
        amapSearch: search_vue_1.default
    }
};
