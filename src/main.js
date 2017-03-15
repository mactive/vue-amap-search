"use strict";
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
console.log(vue_1.default);
var tt = new vue_1.default({
    el: '#app',
    components: { App: App_vue_1.default },
    render: function (h) { return h(App_vue_1.default); }
});
console.log(tt);
