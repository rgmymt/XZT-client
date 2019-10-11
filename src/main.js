// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//导入ElementUI组件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// 导入App根组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import './assets/iconfont/iconfont.css'
import router from './router'
import Mui from 'vue-awesome-mui';
 
import store from './store'

Vue.use(Mui);
Vue.use(ElementUI);
Vue.config.productionTip = false
//静态变量
Vue.prototype.yuming = "http://47.101.155.73:8080/test"
//Vue.prototype.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTUzMzkwNTAyNTIsInBheWxvYWQiOiJ7XCJwaG9uZVwiOlwiQVwiLFwicGFzc3dvcmRcIjpcIkJcIixcInVzZXJJRFwiOjF9In0.z39j4x-2RdroBAZce2WoBCFUwXkglorq2yBilWKWeXk"
/* eslint-disable no-new */
VueAMap.initAMapApiLoader({
  key: 'b309c21e07d89f391fccfa363c7299e3',
	 plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType','AMap.Geolocation','MarkerClusterer'],
  // 默认高德 sdk 版本为 1.4.4
   uiVersion: '1.0.11' // 版本号
})

// 添加请求拦截器，在请求头中加token
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('Authorization')) {
//       config.headers.Authorization = localStorage.getItem('Authorization');
//       console.log(localStorage.getItem('loginid'));
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
new Vue({
  el: '#app',
  // render: c=>c(app)
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

// router.beforeEach((to, from, next) => {
// 	if (to.path === '/login') {
// 	  next();
// 	} else {
// 	  let token = localStorage.getItem('Authorization');
//    
// 	  if (token === 'null' || token === '') {
// 		next('/login');
// 	  } else {
// 		next();
// 	  }
// 	}
// });
