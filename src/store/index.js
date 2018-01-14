import Vue from 'vue';
import Vuex from 'vuex';

import main from './modules/main';
import userSate from './modules/UserState';

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    main,
    userSate
  }
});
