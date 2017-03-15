import Vue from 'vue'
import App from './App.vue'

console.log(Vue);

var tt = new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})
console.log(tt);

