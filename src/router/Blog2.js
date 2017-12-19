/**
 * Created by huorong on 17/10/23.
 */
import {
  blog2,
  home
} from '../pages/index';

const blog2Router = [
  {
    path: '/blog2',
    component: blog2,
    meta: {title: 'blog例子'},
    children: [
      {
        path: 'home',
        component: home,
        meta: {title: 'blog2'}
      }
    ]
  }
];
export default blog2Router;
