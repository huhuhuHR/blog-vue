import Vue from 'vue';
import Router from 'vue-router';
import auth from '../auth';
import {
  homePage,
  articleCenter,
  articleDetail,
  workCareer,
  toolkit,
  projectRecord,
  photoWall,
  vuexDemo,
  login,
  acticleList,
  ValidateCode,
  theLifeCycle,
  acticleAdd
} from '../pages/index';
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
      path: '/homePage',
      name: '主页',
      component: homePage,
      meta: {title: 'homePage'}
    },
    {
      path: '/articleCenter',
      name: '文章',
      component: articleCenter,
      meta: {title: 'articleCenter'}
    },
    {
      path: '/acticleList',
      name: '文章列表',
      component: acticleList,
      meta: {title: '记录list'}
    },
    {
      path: '/acticleAdd',
      name: '添加',
      component: acticleAdd,
      meta: {title: '添加'}
    },
    {
      path: '/articleDetail',
      name: '文章详情',
      component: articleDetail,
      meta: {title: 'articleDetail'}
    },
    {
      path: '/workCareer',
      name: '简历',
      component: workCareer,
      meta: {title: 'workCareer'}
    },
    {
      path: '/toolkit',
      name: '工具箱',
      component: toolkit,
      meta: {title: '工具箱'}
    },
    {
      path: '/projectRecord',
      name: '工作记录',
      component: projectRecord,
      meta: {title: '工作记录'}
    },
    {
      path: '/photoWall',
      name: '照片墙',
      component: photoWall,
      meta: {title: '照片墙'}
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
