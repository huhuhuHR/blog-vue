/**
 * Created by huorong on 17/10/23.
 */
import {
  blog2,
  home,
  toShare,
  active,
  manage
} from '../pages/index';

const blog2Router = [
  {
    path: '/blog',
    component: blog2,
    meta: {title: '我的'},
    redirect: '/blog/home',
    children: [
      {
        path: 'home',
        component: home,
        meta: {title: '博客'}
      },
      {
        path: 'share',
        component: toShare,
        meta: {title: '恩系那个'}
      },
      {
        path: 'active',
        component: active,
        meta: {title: '激活'}
      },
      {
        path: 'manage',
        component: manage,
        meta: {title: '管理'}
      }
    ]
  }
];
export default blog2Router;
