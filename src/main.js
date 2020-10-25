import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate';
import router from './router.js';
import store from './store';
import baseComponent from './components/ui/index';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
})

new Vue({
  router,
  store,
  baseComponent,
  render: h => h(App)
}).$mount('#app')
