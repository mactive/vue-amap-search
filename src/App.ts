import Vue = require('vue');

/**
 * dev 使用, 直接修改源文件
 */
import amapSearch from './components/amapsearch/search.vue'

/**
 * production 使用 , 读取本地打包好的文件
 */
// import amapSearch from '../dist/lib/main.js'
// import '../dist/lib/main.css'

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
      msg: 'Welcome to Your Vue.js App --- ' + MrRight.name,
      userInput: '',
      pickedLocation: {
        location:{}
      }
    }
  },
  methods:{
    handleUserInput: function(_input:string){
      this.userInput = _input;
    },
    handlePickedLocation: function(location: any){
      this.pickedLocation = location;
    }
  },
  components:{
    amapSearch
  }
}