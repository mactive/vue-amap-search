import Vue = require('vue');
import amapSearch from './components/amapsearch/search.vue'

interface Preson{
  name: string;
}

let tt:Preson= {
  name: 'Mr. Right'
}

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App --- ' + tt.name
    }
  },
  components:{
    amapSearch
  }
}