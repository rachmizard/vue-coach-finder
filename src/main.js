import Vue from 'vue'
import App from './App.vue'

import router from './router.js';
import store from './store';
import baseComponent from './components/ui/index';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  baseComponent,
  render: h => h(App)
}).$mount('#app')
