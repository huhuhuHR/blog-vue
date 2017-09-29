import Vue from 'vue';
import Router from 'vue-router';
import auth from '../auth';
import {vuexDemo, login, recordList, ValidateCode, theLifeCycle} from '../pages/index';
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
      path: '/record',
      name: '工作记录',
      component: recordList,
      meta: {title: '工作记录'}
    },
    {
      path: '/vuexDemo',
      component: vuexDemo,
      meta: {title: 'vuexDemo'}
    },
    {
      path: '/getValidateCode',
      component: ValidateCode,
      meta: {title: 'getValidateCode'}
    },
    {
      path: '/theLifeCycle',
      component: theLifeCycle,
      meta: {title: '生命周期'}
    }
  ]
});

router.beforeEach((to, from, next) => {
  to.meta.customTitle = from.meta.customTitle;
  auth.checkAuth();
  if (to.path != '/' && !auth.cookie.authenticated) {
    console.log('登录失败标记');
    next({
      path: '/'
    });
    return;
  }
  next();
});

router.afterEach((route) => {
  document.title = route.meta.customTitle || route.meta.title || '';
});

export default router;
