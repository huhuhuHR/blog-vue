// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import rem from './assets/js/RemUtil';
import http from './http/http';
import store from './store';
import {sync} from 'vuex-router-sync';

http.config(Vue);

rem.initFontSize();

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
