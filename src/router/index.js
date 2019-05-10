//引入vue
import Vue from 'vue'
//获取参数
import  getQueryString from './getQueryString';
//引入路由组件
import Router from 'vue-router';

import cookie from '../static/js/cookie';

//注册路由
Vue.use(Router);
//引入路由需要的组件


//公共部分
import app from '../views/app/app';
import Login from '../views/Login';
// import Login from "@/views/Login";
import test from  "../views/test"

//全局状态控制引入
import store from '../store/store'

//异步加载首页
// var home = function(resolve) {
//   require.ensure(['../views/home/home'], () => {
//     resolve(require('../views/home/home'))
//   }, 'home')
// };

//配置路由
let router = new Router({
  routes: [
    {
      path: '/app',
      component: app,
      meta: {
        title: "App",
        need_log: true
      },
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            title: "Home",
            need_log: true
          },
        },
      ]
    }
    ,{
      path: '/Login',
      name: 'Login',
      component:Login,
      meta: {
        title: "Login",
        need_log: false
      },
    },{
      path: '/tTest',
      name: 'test',
      component:test
    }
  ]
});

//进行路由判断
router.beforeEach((to, from, next) => {
  let nextPath = cookie.getCookie('nextPath');
    if (to !== undefined) {
      if (to.meta.need_log) {
        console.log(to.meta.need_log);
        console.log("需要登陆");
        console.log(store.state.userInfo.token);
        if (!store.state.userInfo.token) {
          console.log("没有登陆");
          next({
            path: '/Login',
          });
        } else {
          console.log("登陆了");
          next();
        }
      } else {
        if (to.path === '/') {
          next({
            path: '/app',
          });
        } else {
          next();
        }
      }
    } else {
      if (to.path === '/') {
        next({
          path: '/app',
        });
      } else {
        next();
      }
    }
});

//修改网页标题
router.afterEach((to, from, next) => {
  document.title = to.matched[to.matched.length - 1].meta.title;
});

//抛出路由
export default router;
