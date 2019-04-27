import * as types from './mutation-types';
import cookie from '../static/js/cookie';
import {getShopCarts} from '../api/api'
// 类似于事件 每个mutation都有字符类型的事件类型和回调函数
//全局引入vue
import Vue from 'vue';
import Axios from 'axios';
Vue.prototype.$http = Axios;


export default {
    [types.SET_INFO] (state) {
        state.userInfo = {
            id:cookie.getCookie('id'),
            name:cookie.getCookie('name'),
            token:cookie.getCookie('token'),
            isSuperUser:cookie.getCookie('isSuperUser')
        };
    },
    [types.SET_ACCEPTEDPROBLEMS] (state) {
      state.userAcceptedProblems = JSON.parse(localStorage.getItem('acceptedproblems'));
    },
    [types.SET_CHALLENGINGPROBLEMS] (state) {
      state.userChallengingProblems = JSON.parse(localStorage.getItem('challengingproblems'));
    },
    [types.SET_COLLECTIONS] (state) {
      state.userCollections = JSON.parse(localStorage.getItem('collections'));
    },
    [types.SET_SHOPLIST] (state) { //设置购物车数据
        // token = cookie.getCookie('token')
        if(cookie.getCookie('token') != null){
          getShopCarts().then((response)=> {
            // 更新store数据
            state.goods_list.goods_list = response.data;
            console.log(response.data)
            var totalPrice = 0
            response.data.forEach(function(entry) {
              totalPrice += entry.goods.shop_price*entry.nums
            });
            state.goods_list.totalPrice = totalPrice;

          }).catch(function (error) {
            console.log(error);
          });
        }
    },


}
