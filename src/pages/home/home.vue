<template>
	<div class="homepage">
		<swiper style="height: 180px;">
      <swiper-item  v-for="(item, index) in info" :key="index"  >
		 <div @click="opennews(item.articleID)">
			<img v-if="item.cover!=null" :src="yuming.substr(0,yuming.length-5)+item.cover.substr(1)" style="width: 100%;height: 180px;" >
		<div style="margin-top: -30px;font-size: 10px;padding-left: 10px;color: #FFFFFF;line-height: 25px;position: relative;z-index: 2;background-color: rgba(0,0,0,0.3);">{{item.title}}</div>
		</div>
		
	</swiper-item>
    </swiper>
		<div class="gridbox" >
			<grid :show-lr-borders="false" :show-vertical-dividers="false">
				<grid-item link="/fujin" :label="'附近的工作'" style="text-decoration: none;padding-bottom: 0px;">
					<img slot="icon" src="../../assets/icon/fujin.png">
				</grid-item>
				<grid-item link="/apply" :label="'职位申请'" style="text-decoration: none;padding-bottom: 0px;">
					<img slot="icon" src="../../assets/icon/apply.png">
				</grid-item>
				<grid-item link="/employ" :label="'招聘会'" style="text-decoration: none;padding-bottom: 0px;">
					<img slot="icon" src="../../assets/icon/employ.png">
				</grid-item>
			</grid>
		</div>
		<div class="newslisttitle">
			<span class="newst">新闻动态</span>
		</div>
		<scroller lock-x height="350px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
			<div class="box2">
				<div class="newslist" v-for="(context,id) in newslist" :key="id" @click="opennews(context.articleID)">
				
						<flexbox>
							<flexbox-item :span="2/7">
								<div class="newscell-demo">
								<!-- 									<img v-if="context.cover!=null" class="newsimg" :src="yuming+context.cover.substr(1)"></img>-->
									<img v-if="context.cover!=null" class="newsimg" :src="yuming.substr(0,yuming.length-5)+context.cover.substr(1)"></img>
								
								</div>
							</flexbox-item>
							<flexbox-item :span="2/3">
								<div class="newscell-demo" style="margin-left: 8px;text-overflow:ellipsis;overflow: hidden;">
									<span class="newstitle" style="text-overflow:ellipsis;overflow: hidden;">{{context.title}}</span>

									<div class="newscontent">
										{{context.introduction}}
									</div>
									<!-- 											<span class="newsdeadline">{{'截止时间：'+context.deadline.substr(0,context.deadline.length-2)}}</span>
 -->
									<div class="newsmore">
										<span style="border-right:0.1px solid #999999;padding-right: 5px;">{{context.author}}</span>
										<span>{{context.time.substr(0,context.time.length-10)}}</span>
										<span style="float: right;">{{context.clicks}}</span>
									</div>
								</div>
							</flexbox-item>
						</flexbox>
				
				</div>
			</div>
		</scroller>
		<tabbar style="	position: fixed;">
			<tabbar-item style="text-decoration: none;" selected link="/home">
				<i class="iconfont icon-zhaopin" style="font-size: 32px;" slot="icon"></i>
				<span slot="label">招聘</span>
			</tabbar-item>
			<tabbar-item style="text-decoration: none;" link="/train">
				<i class="iconfont icon-zaixianpeixun"  slot="icon"></i>
				<span slot="label">培训</span>
			</tabbar-item>
			<tabbar-item style="text-decoration: none;" link="/Mine">
				<i class="iconfont icon-yonghu1" slot="icon"></i>
				<span slot="label">我的</span>
			</tabbar-item>

		</tabbar>

	</div>
</template>

<script>
	import {
		Swiper,
		SwiperItem,
		Grid,
		GridItem,
		Tabbar,
		Flexbox,
		FlexboxItem,
		TabbarItem,
		Scroller,
		LoadMore
	} from 'vux'
	export default {
		components: {
			Swiper,
			Tabbar,
			TabbarItem,
			Flexbox,
			FlexboxItem,
			Grid,
			GridItem,
			Scroller,
			SwiperItem,
			LoadMore
		},
		ready() {

		},
		methods: {
			
			onImgError(item, $event) {
				console.log(item, $event)
			},
			onScrollBottom() {
				if (this.onFetching) {
					// do nothing
				} else {
					this.onFetching = true
					setTimeout(() => {
						this.bottomCount += 3
						this.$nextTick(() => {
							this.$refs.scrollerBottom.reset()
						})
						this.onFetching = false
					}, 2000)
				}
			},
			getnewslist() {
				this.axios.get(this.yuming + '/list/article', {
						params: {
							ArticleType: 1,
							number: this.bottomCount,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
						}
					})
					.then((response) => {
						console.log(response.data.data.info)
						this.newslist = response.data.data.info;
					})
			},
			getnewslunbo() {
				this.axios.get(this.yuming + '/list/article/push', {
						params: {
							ArticleType: 1,
							number: 3,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
						}
					})
					.then((response) => {
						console.log(response.data.data.info)
						console.log('a')
						this.info=response.data.data.info
					
					})
			},
			beforeRouteEnter (to, from, next) {
       console.log(to)
       console.log(from)
       console.log(next)
      next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      console.log(vm);//当前组件的实例
    });
   },
					opennews(id){
							this.axios.get(this.yuming + '/article/content', {
														params: {
															ArticleNumber:id,
															token:localStorage.getItem('Authorization'),
															loginId: localStorage.getItem('loginid'),
														}
													})
													.then((response) => {
														console.log(response.data)
						// 								this.title= response.data.title
						// 								this.date= response.data.time.substr(0,response.data.time.length-10)
						// 								this.publish= response.data.author
														var content=	this.yuming.substr(0,	this.yuming.length-5)+ '/GMap'+response.data.content.substr(1)
														window.location.href = content
									
													})
					}
		},
		watch:{
			bottomCount(newCount,oldCount){
				this.getnewslist();
			}
		},
		created() {
			this.getnewslist()
			this.getnewslunbo()
		},
		mounted(){
			var body=document.getElementsByClassName('homepage')[0]
			body.style.height=`${document.documentElement.clientHeight}`+'px'
			body.style.backgroundColor="#FFFFFF"
		},
		data() {
			return {
				info:  [],
				bottomCount: 5,
				newslist:[],
				newscontent:'',
// 				newslist: [{
// 						cover: './static/img/newsimg1.png',
// 						title: '全国人力资源和社会保障工作会议暨人社扶贫工作座谈会召开',
// 						content: '12月28日至29日，全国人力资源和社会保障工作会议暨人社扶贫工作座谈会在北京召开。会议总结2018年工作，分析形势，研究部署2019年重点任务，并对人社扶贫工作进行再动员再部署。',
// 						author: '新华社',
// 						time: '2019-4-2',
// 					},
// 					{
// 						cover: './static/img/newsimg1.png',
// 						title: '全国人力资源和社会保障工作会议暨人社扶贫工作座谈会召开',
// 						content: '12月28日至29日，全国人力资源和社会保障工作会议暨人社扶贫工作座谈会在北京召开。会议总结2018年工作，分析形势，研究部署2019年重点任务，并对人社扶贫工作进行再动员再部署。',
// 						author: '新华社',
// 						time: '2019-4-2',
// 					},
// 					{
// 						cover: './static/img/newsimg1.png',
// 						title: '全国人力资源和社会保障工作会议暨人社扶贫工作座谈会召开',
// 						content: '12月28日至29日，全国人力资源和社会保障工作会议暨人社扶贫工作座谈会在北京召开。会议总结2018年工作，分析形势，研究部署2019年重点任务，并对人社扶贫工作进行再动员再部署。',
// 						author: '新华社',
// 						time: '2019-4-2',
// 					},
// 					{
// 						cover: './static/img/newsimg1.png',
// 						title: '全国人力资源和社会保障工作会议暨人社扶贫工作座谈会召开',
// 						content: '12月28日至29日，全国人力资源和社会保障工作会议暨人社扶贫工作座谈会在北京召开。会议总结2018年工作，分析形势，研究部署2019年重点任务，并对人社扶贫工作进行再动员再部署。',
// 						author: '新华社',
// 						time: '2019-4-2',
// 					},
// 					{
// 						cover: './static/img/newsimg1.png',
// 						title: '全国人力资源和社会保障工作会议暨人社扶贫工作座谈会召开',
// 						content: '12月28日至29日，全国人力资源和社会保障工作会议暨人社扶贫工作座谈会在北京召开。会议总结2018年工作，分析形势，研究部署2019年重点任务，并对人社扶贫工作进行再动员再部署。',
// 						author: '新华社',
// 						time: '2019-4-2',
// 					}
// 				],
			}
		}
	}
</script>

<style>
	.icontext {
		font-size: 12px;
		color: #696969;
	}

	

	.weui-tabbar__label{
		margin: 0px;
		padding: 0px !important;
	}
	.gridbox /deep/ .weui-grid__icon {
		width: 50px !important;
		height: 50px !important;
	}

	.gridbox /deep/ .weui-grid__label {
		color: #696969 !important;
		font-size: 12px !important;
		width: 60px !important;
		margin-left: auto;
		margin-right: auto;
	}

	.newslisttitle {
		margin-top: 20px;
		margin-left: 3%;
		margin-bottom: 5px;
		background-image: url(../../assets/icon/newstitle.png);
		background-repeat: no-repeat;
		background-size: contain;
	}

	.newst {
		font-size: 15px;
		color: #FFFFFF;
		margin: 5px;
	}

	.newslist {

		padding-bottom: 5px;
	}

	.newsimg {
		width: 100%;
		height: 60px;
		line-height: 10px;
		border: 0.5px solid #D3D3D3;
		box-shadow: 2px 2px 2px #CCCCCC;
		padding: 3px;

	}

	.newslist {
		margin-top: 5px;
	}

	.newslist .vux-flexbox {
		width: 94% !important;
		margin-left: 3%;
		margin-right: 3%;
	}


	.newscontent {
		color: #999999;
		font-size: 12px;
		width: 90%;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.newstitle {
		font-size: 18px;
		color: #000000;
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.newscell-demo {
		line-height: 20px;
	}

	.newsmore {
		font-size: 10px;
		color: #999999;
	}
</style>
