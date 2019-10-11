<template>
	<div class="enploypage">
	<swiper style="height: 150px;">
      <swiper-item  v-for="(item, index) in employlistlunbo" :key="index">
			<div @click="$router.push({path:'/employdetil',query:{employid:item.jobFairID}})">
			<img v-if="item.cover!=null" :src="yuming.substr(0,yuming.length-5)+item.cover.substr(1)" style="width: 100%;height: 150px;" >
	
		<div style="margin-top: -30px;font-size: 10px;padding-left: 10px;line-height: 25px;color: #FFFFFF;position: relative;z-index: 2;background-color: rgba(0,0,0,0.3);">{{item.title}}</div>
		</div>
	</swiper-item>
    </swiper>
	<x-icon type="ios-arrow-left" size="30" style="float:left;position: fixed;top:5px;fill:#FFFFFF"  @click="$router.go(-1)"></x-icon>
	<div>
		<div class="employchoose" style="width: 90%;margin-left: auto;margin-right: auto;margin-top: 10px;">
			<el-cascader :options="options1" v-model="selectedquyu" placeholder="区域" :show-all-levels="false"  filterable change-on-select style="width: 32%;"></el-cascader>
			<el-select v-model="selectedsort" placeholder="排序" style="width: 32%;" >
		<el-option v-for="item in options2" :key="item.number" :label="item.value" :value="item.number"></el-option>
	</el-select>
			<el-select v-model="selectedtype" placeholder="类型" style="width: 32%;" >
		<el-option v-for="item in options3" :key="item.number" :label="item.value" :value="item.number"></el-option>
	</el-select>
	</div>
	<scroller lock-x height="450px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
		<div>
				<div class="employlist" v-for="(context,id) in employlist" :key="id">
					<div  @click="$router.push({path:'/employdetil',query:{employid:context.jobFairID}})" style="text-decoration: none;">
						<flexbox>
							<flexbox-item :span="1/3">
								<div class="employcell-demo" >
									<img v-if="context.cover!=null" class="employimg" :src="yuming.substr(0,yuming.length-5)+context.cover.substr(1)">
								
								</div>
							</flexbox-item>
							<flexbox-item :span="2/3">
								<div class="employcell-demo">
									<span class="employtitle">{{context.title}}</span>
									<br>
									<span class="employaddress">{{context.province+context.city+context.area+context.launchingPlace}}</span>
	
									<br>
									<span class="employtime">{{context.launchingTime}}</span>
								</div>
							</flexbox-item>
						</flexbox>
					</div>
				
					</div>
				</div>
			</scroller>
			</div>
	
	</div>
</template>

<script>
	import {
		Swiper,
		SwiperItem,
		Flexbox,
		FlexboxItem,
		Scroller,
		LoadMore,
	} from 'vux'

	export default {
			components: {
				Swiper,
				SwiperItem,
				Flexbox,
				FlexboxItem,
				Scroller,
				LoadMore,
			},
			ready() {
	
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
				getzhaopinhui() {
					if(this.selectedsort=='')
						this.selfsort=1
					else
						this.selfsort=this.selectedsort
						if(this.selectedtype=='')
							this.type=2
						else
							this.type=this.selectedtype
					this.axios.get(this.yuming + '/list/jobFair', {
							params: {
								province:this.selectedquyu[0],
								city:this.selectedquyu[1],
								area:this.selectedquyu[2],
								scale:this.type,
								number: this.bottomCount,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
								longitude: 30.3115975656,
								latitude: 120.3906297684,
								recommend:0,
								sort: this.selfsort,
							}
						})
						.then((response) => {
							console.log(response.data);
							this.employlist=response.data.data.info	
						}).catch(error => {
						
							this.employlist=[];
							console.log(error);
						})
				},
				getzhaopinhuilunbo() {
					this.axios.get(this.yuming + '/list/jobFair', {
							params: {
								province:'',
								city:'',
								area:'',
								scale:2,
								number: 3,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
								longitude: 30.3115975656,
								latitude: 120.3906297684,
								recommend:1,
								sort: 0,
							}
						})
						.then((response) => {
							console.log(response.data);
							this.employlistlunbo = response.data.data.info;
						})
				}
			},
			created() {
				this.getzhaopinhui();
				this.getzhaopinhuilunbo() 
			},
			watch:{
				bottomCount(newCount,oldCount){
					this.getzhaopinhui();
				},
				selectedsort(newsort,oldsort){
				this.getzhaopinhui();
				},
				selectedquyu(){
				if(this.selectedquyu[0]==undefined)
					this.selectedquyu[0]=""
				if(this.selectedquyu[1]==undefined)
					this.selectedquyu[1]=""
				if(this.selectedquyu[2]==undefined)
					this.selectedquyu[2]=""
				this.getzhaopinhui();
				},
				selectedtype(){
				this.getzhaopinhui();
				}
			},
			mounted(){
				var body=document.getElementsByClassName('enploypage')[0]
				body.style.height=`${document.documentElement.clientHeight}`+'px'
				body.style.backgroundColor="#FFFFFF"
			},
			data() {
				return {
					employlistlunbo: [],
					employlist:[],
					demo01_index: 0,
					bottomCount: 5,
					selectedtype:'',
					type:'',
					selectedquyu:['','',''],
					selectedsort:'',
					selfsort:'',
					options1: [{
							value: '浙江省',
							label: '浙江省',
							children: [{
								value: '杭州市',
								label: '杭州市',
								children: [{
									value: '江干区',
									label: '江干区'
								}, {
									value: '上城区',
									label: '上城区'
								}, {
									value: '滨江区',
									label: '滨江区'
								}, {
									value: '萧山区',
									label: '萧山区'
								},{
									value: '余杭区',
									label: '余杭区'
								},{
									value: '临安区',
									label: '临安区'
								},{
									value: '拱墅区',
									label: '拱墅区'
								}]
							}, {
								value: '宁波市',
								label: '宁波市',
								children: [{
									value: '镇海区',
									label: '镇海区'
								},{
									value: '北仑区',
									label: '北仑区'
								},{
									value: '海曙区',
									label: '海曙区'
								},{
									value: '鄞州区',
									label: '鄞州区'
								}, {
									value: '江北区',
									label: '江北区'
								}]
							}, {
								value: '金华市',
								label: '金华市',
								children: [{
									value: '金东区',
									label: '金东区'
								},{
									value: '浦江县',
									label: '浦江县'
								},{
									value: '义乌市',
									label: '义乌市'
								},{
									value: '东阳市',
									label: '东阳市'
								}, {
									value: '婺城区',
									label: '婺城区'
								}]
							}]
						}, {
							value: '江苏省',
							label: '江苏省',
							children: [{
								value: '南京市',
								label: '南京市',
								children: [{
									value: '玄武区',
									label: '玄武区'
								}, {
									value: '秦淮区',
									label: '秦淮区'
								}, {
									value: '建邺区',
									label: '建邺区'
								}, {
									value: '鼓楼区',
									label: '鼓楼区'
								}, {
									value: '浦口区',
									label: '浦口区'
								}]
							}, {
								value: '无锡市',
								label: '无锡市',
								children: [{
									value: '锡山区',
									label: '锡山区'
								}, {
									value: '惠山区',
									label: '惠山区'
								}, {
									value: '滨湖区',
									label: '滨湖区'
								}, {
									value: '梁溪区',
									label: '梁溪区'
								}, {
									value: '宜兴区',
									label: '宜兴区'
								}]
							}]
							}, {
								value: '广东省',
								label: '广东省',
								children: [{
									value: '广州市',
									label: '广州市',
									children: [{
										value: '海珠区',
										label: '海珠区'
									}, {
										value: '天河区',
										label: '天河区'
									}, {
										value: '黄浦区',
										label: '黄浦区'
									}, {
										value: '白云区',
										label: '白云区'
									}, {
										value: '荔湾区',
										label: '荔湾区'
									}]
								}, {
								value: '深圳市',
								label: '深圳市',
								children: [{
									value: '福田区',
									label: '福田区'
								}, {
									value: '南山区',
									label: '南山区'
								}, {
									value: '罗湖区',
									label: '罗湖区'
								}, {
									value: '盐田区',
									label: '盐田区'
								}, {
									value: '宝安区',
									label: '宝安区'
								}]
							}]
							}],
					
						options2:[ 
							{
								number: 0,
								value: '最新发布'
							},
						 {
								number: 2,
								value: '距离最近'
							},
						],
						options3: [
							{
								number: 2,
								value: '全部'
							},
							{
								number: 1,
								value: '大型招聘会'
							},
							{
								number: 0,
								value: '小型招聘会'
							},	
						],
					
					
				}
			}
		}
</script>

<style>
	.el-cascader-menu{
		height: auto;
		min-width: 30%;
	}
	.employimg {
		width: 100%;
		height: 60px;

	}
		.employchoose .el-input__inner{
		border: 0px !important;
	}

	
	.employlist {
		margin-top: 5px;
	}

	.employlist .vux-flexbox {
		width: 94% !important;
		margin-left: 3%;
		margin-right: 3%;
	}

	.employtime {
		font-size: 13px;
		color: #696969;
	}

	.employaddress {
		color: #696969;
		font-size: 13px;
	}

	.employtitle {
		font-size: 18px;
		color: #000000;
	}

	.employcell-demo {
		line-height: 25px;
	}

</style>
