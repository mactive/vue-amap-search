import Vue = require('vue');
import amapSearch from './components/amapsearch/search.vue'

interface Preson{
  name: string;
}

let MrRight:Preson= {
  name: 'Mr. Right'
}

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App --- ' + MrRight.name
    }
  },
  components:{
    amapSearch
  }
}