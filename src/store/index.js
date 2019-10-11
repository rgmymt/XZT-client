import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        //存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        loginid: '',
			phone:'',
			password:'',
    },
    mutations: {
      // 修改token，并将token存入localStorage
      changeLogin (state, user) {
        state.Authorization = user.Authorization;
        state.loginid = user.loginid;
        localStorage.setItem('Authorization', user.Authorization);
        localStorage.setItem('loginid', user.loginid);
      },
			setlogin (state,userinfo){
				state.phone = userinfo.phone;
        state.password = userinfo.password;
        localStorage.setItem('phone', userinfo.phone);
        localStorage.setItem('password', userinfo.password);
			}
    }
});
 
export default store;