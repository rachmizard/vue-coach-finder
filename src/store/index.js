import Vue from 'vue'
import Vuex from 'vuex'
import coaches from './modules/coaches';
import requests from './modules/requests';
import auth from './modules/auth';
import VuexPersistence from 'vuex-persist';


const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})
 
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    coaches,
    requests,
    auth
  },
  plugins: [vuexLocal.plugin]
})
