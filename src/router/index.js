import Vue from 'vue';
import Router from 'vue-router';
import blog2Router from './Blog2';
import dmo from './demo';

Vue.use(Router);


const router = new Router({
  mode: 'hash',
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/',
      name: 'homePage',
      redirect: '/blog'
    },
  ].concat(blog2Router).concat(dmo)
});
// 作用于所有路由切换，一般在main.js里面定义
// router.beforeEach((to, from, next) => {
//   to.meta.customTitle = from.meta.customTitle;
//   auth.checkAuth();
//   if (to.path != '/' && !auth.cookie.authenticated) {
//     console.log('登录失败标记');
//     // next的四种用法
//     // 1.next() 跳入下一个页面
//     // 2.next('/path') 改变路由的跳转方向，使其跳到另一个路由
//     // 3.next(false)  返回原来的页面
//     // 4.next((vm)=>{})  仅在beforeRouteEnter中可用，vm是组件实例。
//     next({
//       path: '/'
//     });
//     return;
//   }
//   next();
// });
//在所有路由跳转结束的时候调用，和beforeEach是类似的，但是它没有next方法
router.afterEach((route) => {
  document.title = route.meta.customTitle || route.meta.title || '';
});

export default router;
