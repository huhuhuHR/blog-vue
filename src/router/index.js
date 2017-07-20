import Vue from 'vue';
import Router from 'vue-router';
import {vuexDemo, login} from '../pages/index';
Vue.use(Router);

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/',
      name: '登录',
      component: login,
      meta: {title: '登录'}
    },
    {
      path: '/vuexDemo',
      component: vuexDemo,
      meta: {title: 'vuexDemo'}
    }
  ]
});

router.beforeEach((to, from, next) => {
  to.meta.customTitle = from.meta.customTitle;
  next();
});

router.afterEach((route) => {
  document.title = route.meta.customTitle || route.meta.title || '';
});

export default router;
