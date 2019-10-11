import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/home.vue'
import NewsDetil from '@/pages/home/newsdetil.vue'
import Employ from '@/pages/employ/employ.vue'
import EmployDetil from '@/pages/employ/employdetil.vue'
import Apply from '@/pages/apply/apply.vue'
import ApplyDetil from '@/pages/apply/applydetil.vue'
import Test from '@/pages/test.vue'
import Train from '@/pages/train/train.vue'
import More from '@/pages/train/more.vue'
import Tiku from '@/pages/tiku/tiku.vue'
import Errorbook from '@/pages/tiku/errorbook.vue'
import Errordetil from '@/pages/tiku/errordetil.vue'
import Paper from '@/pages/tiku/paper.vue'
import Moni from '@/pages/tiku/moni.vue'
import Findtest from '@/pages/kaoshi/findtest.vue'
import Score from '@/pages/kaoshi/score.vue'
import BaoMing from '@/pages/kaoshi/baoming.vue'
import Map from  '@/pages/map/map.vue'
import Fujin from  '@/pages/map/fujin.vue'
import login from '@/pages/login/login'
import forget from '@/pages/forget/forget'
import registe from '@/pages/registe/registe'
import Tiaoli from '@/pages/tiaoli/tiaoli'
import DirectionalT from '@/pages/DirectionalT/DirectionalT'
import DirectionalT_course from '@/pages/DirectionalT/DirectionalT_course/DirectionalT_course'
import courseRe from '@/pages/courseRe/courseRe'
import courseDetails from '@/pages/courseRe/courseDetails/courseDetails'
import shoppingcart from '@/pages/shoppingcart/shoppingcart'
import tttp from '@/pages/tttp/tttp'
import Mine from '@/pages/Mine/Mine'
import message from '@/pages/Mine/message'
import brush from '@/pages/Mine/brush'
import setting from '@/pages/Mine/setting'
import changephone from '@/pages/Mine/changephone'
import smrz from '@/pages/Mine/smrz'
import myclass from '@/pages/Mine/myclass'
import collection from '@/pages/Mine/collection'
import article from '@/pages/article/article'
Vue.use(Router)

export default new Router({
  routes: [
		{
		path: '/home',
		component: Home
		},
		{
			path: '/article',
			component: article
		},
		{
			path: '/',
			component: login
		},
		{
			path: '/login',
			component: login
		},
		{
			path: '/tiaoli',
			component: Tiaoli
		},
		{
			path: '/Mine',
			component: Mine
		},
		{
			path: '/Mine/collection',
			component: collection
		},		
		{
			path: '/Mine/myclass',
			component: myclass
		},
		{
			path: '/Mine/smrz',
			component: smrz
		},		
		{
			path: '/Mine/setting',
			component: setting
		},
		{
			path: '/Mine/setting/changephone',
			component: changephone
		},
		{
			path: '/Mine/brush',
			component: brush
		},
		{
			path: '/Mine/message',
			component: message
		},
		{
			path: '/courseRe',
			component: courseRe
		},
		{
			path: '/courseRe/courseDetails',
			component: courseDetails
		},
		{
			// path: '/courseRe/courseDetails/shoppingcart',
			path: '/courseRe/courseDetails/shoppingcart',
			component: shoppingcart
		},
		{
			path: '/courseRe/courseDetails/shoppingcart/tttp',
			component: tttp
		},
		{
			// path: '/DirectionalT/DirectionalT_course',
			path: '/DirectionalT/DirectionalT_course',
			component: DirectionalT_course
		},
		{
			path: '/DirectionalT',
			component: DirectionalT
		},
		{
			path: '/forget',
			component: forget
		},
		{
			path: '/registe',
			component: registe
		},
		{
			path: '/newsdetil',
			component: NewsDetil
		},
		{
			path: '/fujin',
			component: Fujin
		},
		{
			path: '/map',
			component: Map
		},
		{
			path:'/employ',
			component:Employ
		},
		{
			path:'/employdetil',
			component:EmployDetil
		},
		{
			path:'/apply',
			component:Apply
		},
		
		{
			path:'/applydetil',
			component:ApplyDetil
		},
		{
			path:'/train',
			component:Train
		},
		{
			path:'/more',
			component:More
		},
		{
			path:'/tiku',
			component:Tiku
		},
		{
			path:'/errorbook',
			component:Errorbook
		},
		{
			path:'/errordetil',
			component:Errordetil
		},
		{
			path:'/paper',
			component:Paper
		},
		{
			path:'/moni',
			component:Moni
		},
		{
			path:'/findtest',
			component:Findtest
		},
		{
			path:'/score',
			component:Score
		},
		{
			path:'/baoming',
			component:BaoMing
		}
  ]
});

  


