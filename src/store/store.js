//引入vue
import Vue from 'vue'
//全局引入vueX
import Vuex from 'vuex';

import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

//全局注册vueX
Vue.use(Vuex);
//全局引用cookie方法类
import cookie from '../static/js/cookie';

const userInfo = {
            id:cookie.getCookie('id') || null,
            name:cookie.getCookie('name') || null,
            token:cookie.getCookie('token') || null,
            jobfunction:cookie.getCookie('jobfunction') || null,
        };
const userCollectJobs = localStorage.getItem('collectjobs') || null;
const userFocusCompanies = localStorage.getItem('focuscompanies') || null;
const state = {
    topnavigation:"/",
    userInfo,
    userCollectJobs,
    userFocusCompanies,
};
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});



