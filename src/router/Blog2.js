/**
 * Created by huorong on 17/10/23.
 */
import {
  blog2,
  home,
  toShare,
  active
} from '../pages/index';

const blog2Router = [
  {
    path: '/blog',
    component: blog2,
    meta: {title: 'blog例子'},
    redirect: '/blog/home',
    children: [
      {
        path: 'home',
        component: home,
        meta: {title: 'blog2'}
      },
      {
        path: 'share',
        component: toShare,
        meta: {title: 'share'}
      },
      {
        path: 'active',
        component: active,
        meta: {title: 'active'}
      }
    ]
  }
];
export default blog2Router;
