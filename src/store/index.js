import Vue from 'vue';
import Vuex from 'vuex';

import main from './modules/main';

Vue.use(Vuex);

const state = new Vuex.Store({
  modules: {
    main
  }
});

export default state;
