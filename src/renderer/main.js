import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ConfigApp from '@/configApp'
/* import Store from '@/VueXStore' */

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.configApp = ConfigApp
/* Vue.Storetoken = Store */

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
