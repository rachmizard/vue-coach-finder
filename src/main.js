import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate';
import router from './router.js';
import store from './store';
import commonApi from './service/commonApi';
import authApi from './service/authApi';
import baseComponent from './components/ui/index';
import 'animate.css';

import VuePageTransition from 'vue-page-transition'

const infiniteScroll =  require('vue-infinite-scroll');
const VueScrollTo = require('vue-scrollto');

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueScrollTo)
Vue.use(VuePageTransition)
Vue.use(infiniteScroll)

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
})

new Vue({
  router,
  store,
  commonApi,
  authApi,
  baseComponent,
  render: h => h(App)
}).$mount('#app')
