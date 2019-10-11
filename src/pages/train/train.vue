<template>
	<div class="trainpage" style="padding-bottom: 50px;">
		<img src="../../assets/img/peixunheader.png" style="width: 100%;">
		<div class="gridbox" >
		 <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/tiku" :label="'题库训练'" style="text-decoration: none;padding-bottom: 0px;">
        <img slot="icon" src="../../assets/icon/tiku.png">
      </grid-item>
	  <grid-item link="/courseRe" :label="'课程推荐'" style="text-decoration: none;padding-bottom: 0px;">
	  <img slot="icon" src="../../assets/icon/tuijian.png">
	  </grid-item>
    <grid-item link="/findtest" :label="'考试查询'" style="text-decoration: none;padding-bottom: 0px;">
    	<img slot="icon" src="../../assets/icon/chaxun.png">
    </grid-item>
		 <grid-item link="/DirectionalT" :label="'定向委培'" style="text-decoration: none;padding-bottom: 0px;">
		 	<img slot="icon" src="../../assets/icon/weipei.png">
		 </grid-item>
    </grid>
		</div>
		<h4 style="color: #FF8C00;text-align: center;margin-bottom: 0px;margin-top: 10px;">今日特价</h4>
		<div style="font-size: 10px;color: #999999;float: right;margin-right: 10px;margin-bottom: 10px;" @click="$router.push({path:'/more',query:{moretype:0}})">更多>></div>
			
		<div class="todayvideo-box">
			<flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3" v-for="(todayvideo,id) in tejialist" :key="id">
			<div class="todayvideo-demo" @click="$router.push({path:'/courseRe/courseDetails',query:{g_id:todayvideo.groupID}})">
			
					<img v-if="todayvideo.cover!=null" class="todayvideo-img" :src="yuming.substr(0,yuming.length-5)+todayvideo.cover.substr(1)"></img>
		
				<div style="width: 90%;line-height: 12px; margin-left: auto;margin-right: auto;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;text-overflow:ellipsis;overflow: hidden;">
				<span class="todayvideo-title">{{todayvideo.title}}</span>
				</div>
				<div style="width: 90%; margin-left: auto;margin-right: auto;font-size: 10px;">
				<span style="color: #999999;"><s>{{'￥'+todayvideo.price+'元'}}</s></span>
				<br>
				<span style="color: #FF0000;">{{'￥'+todayvideo.discount+'元'}}</span>
				</div>
			</div>
			</flexbox-item>
    </flexbox>
		</div>
		<h4 style="color: #FF0000;text-align: center;margin-bottom: 0px;margin-top: 10px;">今日热门</h4>
		<div style="font-size: 10px;color: #999999;float: right;margin-right: 10px;margin-bottom: 10px;" @click="$router.push({path:'/more',query:{moretype:1}})">更多>></div>
			<div class="todayvideo-box">
					<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="1/3" v-for="(todayvideo,id) in remenlist" :key="id">
					<div class="todayvideo-demo" @click="$router.push({path:'/courseRe/courseDetails',query:{g_id:todayvideo.groupID}})">
					<img v-if="todayvideo.cover!=null" class="todayvideo-img" :src="yuming.substr(0,yuming.length-5)+todayvideo.cover.substr(1)"></img>
						<div style="width: 90%;line-height: 12px; margin-left: auto;margin-right: auto;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;text-overflow:ellipsis;overflow: hidden;">
						<span class="todayvideo-title">{{todayvideo.title}}</span>
						</div>
						<div style="width: 90%; margin-left: auto;margin-right: auto;font-size: 10px;">
						<span style="color: #999999;">{{'今日播放量：'+todayvideo.playToday}}</span>
						<br>
						<span style="color: #FF0000;">{{'￥'+todayvideo.price+'元'}}</span>
						</div>
					</div>
					</flexbox-item>
				</flexbox>
		</div>
		<tabbar style="	position: fixed;">
					<tabbar-item style="text-decoration: none;" link="/home">
							<i class="iconfont icon-zhaopin" style="font-size: 32px;" slot="icon" ></i>
						<span slot="label">招聘</span>
					</tabbar-item>
					<tabbar-item style="text-decoration: none;" selected link="/train">
					<i class="iconfont icon-zaixianpeixun"  slot="icon"></i>
					<span slot="label">培训</span>
					</tabbar-item>
					<tabbar-item style="text-decoration: none;" link="/Mine">
							<i class="iconfont icon-yonghu1" slot="icon" ></i>
						<span slot="label">我的</span>
					</tabbar-item>
		
				</tabbar>
	</div>
</template>

<script>
	import {
		Tabbar,
		TabbarItem,
		Flexbox,
		FlexboxItem,
		  Grid,
    GridItem
	} from 'vux'

	export default {
		components: {
			  Grid,
    GridItem,
		Flexbox,
		FlexboxItem,
	Tabbar,
	TabbarItem,
		},
		created() {
			this.getremenlist()
			this.gettejialist()
		},
		methods: {
			gettejialist() {
				this.axios.get(this.yuming + '/list/video/discount', {
						params: {
						
							number: 3,
						token:localStorage.getItem('Authorization'),
						loginId: localStorage.getItem('loginid'),
					
						}
					})
					.then((response) => {
						console.log(response.data.data.info);
					this.tejialist=response.data.data.info;
					}).catch(error => {
					
						this.tejialist=[];
						console.log(error);
					})
			},
			getremenlist() {
				this.axios.get(this.yuming +'/list/video/hot' , {
						params: {
							number: 3,
						token:localStorage.getItem('Authorization'),
						loginId: localStorage.getItem('loginid'),
							
						}
					})
					.then((response) => {
						console.log(response.data.data.info);
						this.remenlist=response.data.data.info;
					}).catch(error => {
					this.remenlist=[];
					
						console.log(error);
					})
			},
		},
		mounted(){
			var body=document.getElementsByClassName('trainpage')[0]
			body.style.height=`${document.documentElement.clientHeight}`+'px'
			body.style.backgroundColor="#FFFFFF"
		},
		
		data() {
			return {
				tejialist:[],
				remenlist:[],
				}
				}
				}
</script>

<style>
	.train-header{
		height: 100px;
		width: 100%;
	}
.icontext{
	font-size: 12px;
	color: #696969;
}
.weui-tabbar__label{
	margin: 0px;
	padding: 0px !important;
}
.gridbox .weui-grids:before{
	border-top: 0px !important;
}
.gridbox .weui-grid{
	padding-top:0px;
}
.gridbox  .weui-grid__icon{
	width: 50px !important;
	height: 50px !important;
}
.gridbox .weui-grid__label{
	color:#696969 !important;
	font-size: 12px !important;
	width: 60px !important;
	margin-left: auto;
	margin-right: auto;
}
.todayvideo-img{
	width: 100%;
	height: 100px;
}
.todayvideo-title{
	font-size: 10px;
	color: #999999;
}
</style>
