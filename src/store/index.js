import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import {state,getters, actions, mutations} from './root.js';

const Sqlite = require("nativescript-sqlite");

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    auth,
  },
  state,
  mutations,
  getters,
  actions,
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;


// We want to make sure our database is initialized when the application opens. 
// To do this, add the following line to the bottom of your src/store/index.js file:
store.dispatch("init");