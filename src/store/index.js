import Vue from 'vue'
import Vuex from 'vuex'
import coaches from './modules/coaches';
import requests from './modules/requests';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    coaches,
    requests
  }
})
