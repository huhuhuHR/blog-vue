/**
 * Created by huorong on 17/10/23.
 */
/**
 * Created by huorong on 17/10/23.
 */
import {
  Demo,
  vuexDemo,
  ValidateCode,
  theLifeCycle,
  operationDemo
} from '../pages/index';
const demoRouter = [
  {
    path: '/demo',
    component: Demo,
    meta: {title: 'blog例子'},
    // redirect: '/demo/theLifeCycle',
    children: [
      {
        path: 'vuexDemo',
        component: vuexDemo,
        meta: {title: 'vuex例子1'}
      },
      {
        path: 'getValidateCode',
        component: ValidateCode,
        meta: {title: '验证码'}
      },
      {
        path: 'theLifeCycle',
        component: theLifeCycle,
        meta: {title: '生命周期'}
      },
      {
        path: 'operationDemo',
        component: operationDemo,
        meta: {title: 'vuex例子2'}
      }
    ]
  }
];
export default demoRouter;
