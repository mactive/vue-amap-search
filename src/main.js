"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
new vue_1.default({
    el: '#app',
    components: { App: App_vue_1.default },
    render: function (h) { return h(App_vue_1.default); }
});
