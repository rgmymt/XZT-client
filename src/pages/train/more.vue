<template>
	<div>
	<x-header :left-options="{backText: ''}" style="position: fixed;top:0px;z-index: 2;">
		<span v-if="showtejia" style="margin-top:5px;font-size:17px;">今日特价</span>
		<span v-if="showremen" style="margin-top:5px;font-size:17px;">今日热门</span>
	</x-header>
	<scroller lock-x height="700px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
	<div style="padding-top: 80px;">
					<div class="courselist" v-for="(context,id) in courselist" :key="id">
						
						<div  @click="$router.push({path:'/courseRe/courseDetails',query:{g_id:context.groupID}})" style="text-decoration: none;">
							<flexbox>
								<flexbox-item :span="1/3">
									<div class="course-demo" >
							
										<img v-if="context.cover!=null" class="courseimg" :src="yuming.substr(0,yuming.length-5)+context.cover.substr(1)"></img>
									
									</div>
								</flexbox-item>
								<flexbox-item :span="2/3">
									<div class="course-demo" style="width: 90%;">
										<span class="coursetitle" >{{context.title}}</span>
										<span style="margin-top:5px;font-size:14px;color: #999999;" >评分：</span>
										<span style="margin-top:5px;font-size:14px;color: #FF0000;">{{context.grades}}</span>
										<br>
										<span v-if="showtejia" style="margin-top:5px;font-size:14px;color: #999999;margin-right: 10px;"><s>{{'￥'+context.price}}</s></span>
										<span v-if="showremen" style="margin-top:5px;font-size:13px;color: #999999;margin-right: 10px;">{{'今日播放量：'+context.playToday}}</span>
										
										<span class="courseprice">{{'￥'+context.discount}}</span>
									
										<br>
										<span style="margin-top:5px;font-size:14px;color: #999999;">{{context.views+'人观看过'}}</span>
									</div>
								</flexbox-item>
							</flexbox>
						</div>
					</div>
<!-- 					<load-more tip="loading"></load-more>
 -->				</div>
				</scroller>

	</div>
</template>

<script>
	import {
			XHeader,
			Flexbox,
			FlexboxItem,
			Scroller,
			LoadMore,
		} from 'vux'
	
		export default {
			components: {
				XHeader,
				Flexbox,
				FlexboxItem,
				Scroller,
				LoadMore,
			},
			created() {
				var moretype=this.$route.query.moretype
				if(moretype==0){
				this.showtejia=true
				this.showremen=false
				this.gettejialist()
				}
				if(moretype==1){
				this.showremen=true
				this.showtejia=false
				this.getremenlist()
				}
			},
			watch:{
			
				bottomCount(newCount,oldCount){
					if(this.showtejia==true){
					this.gettejialist()
					}
					if(this.showremen==true){
					this.getremenlist()
					}	
				},
			},
			methods: {
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
				gettejialist() {
					this.axios.get(this.yuming + '/list/video/discount', {
							params: {
								number: this.bottomCount,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
						
							}
						})
						.then((response) => {
							console.log(response.data.data.info);
						this.courselist=response.data.data.info;
						}).catch(error => {
						
							this.courselist=[];
							console.log(error);
						})
				},
				getremenlist() {
					this.axios.get(this.yuming +'/list/video/hot' , {
							params: {
								number: this.bottomCount,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
								
							}
						})
						.then((response) => {
							console.log(response.data.data.info);
							this.courselist=response.data.data.info;
						}).catch(error => {
						this.courselist=[];
						
							console.log(error);
						})
				},
			},
			data() {
				return {
					showremen:false,
					showtejia:false,
					bottomCount: 5,
					courselist:[
						{
							src:'./static/img/peixun.jpg',
							title:'跟我学电工，做个技术工，经典电路——启动',
							origin:158,
							price:99,
						},
						{
							src:'./static/img/peixun.jpg',
							title:'跟我学电工，做个技术工，经典电路——启动',
							origin:158,
							price:99,
						},
						{
							src:'./static/img/peixun.jpg',
							title:'跟我学电工，做个技术工，经典电路——启动',
							origin:158,
							price:99,
						}
					],
				}
			}
	}
</script>

<style>
	.vux-header {
			background-color: #7AB9F6 !important;
			height: 45px;
			text-align: center;
			line-height: 60px;
			color: #FFFFFF;
			width: 100%;
		}
	.left-arrow:before {
		border: 2px solid #FFFFFF !important;
		border-width: 2px 0px 0px 2px !important;
	}
		.courseimg {
			width: 100%;
			height: 80px;
	
		}
	
		.courselist {
			margin-top: 5px;
		}
	
		.courselist .vux-flexbox {
			width: 94% !important;
			margin-left: 3%;
			margin-right: 3%;
		}
	
		.courseprice {
			font-size: 15px;
			color: #FF0000;
			
		}
	
	
		.coursetitle {
			font-size: 18px;
			margin-right: 20px;
			color: #000000;
			white-space: nowrap;
			text-overflow:ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 1;
		}
	
		.course-demo {
			line-height: 25px;
		}
</style>
