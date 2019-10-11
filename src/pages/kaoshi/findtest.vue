<template>
	<div>
		<div style="position: fixed;width: 100%;top:0px;z-index: 2;	background-color: rgb(245, 245, 245);">
		<x-header :left-options="{backText: ''}">
			<span style="margin-top:5px;font-size:17px;">考试查询</span>
		</x-header>
		<div class="search">
			<x-input title="搜索" type="text" placeholder="  输入关键字" class="searchBox" v-model="searchVal" style="background-color:#FFFFFF;">
				<i class="iconfont icon-sousuo" slot="label" style="font-size: 24px;color: #CCCCCC;margin-right: 10px;padding-right:10px;display:block;"
				 width="24" height="24"></i>
			</x-input>
		</div>
			<div style="width: 100%;text-align: center;">
				
					<el-cascader :options="options1" v-model="selectedquyu" placeholder="区域" :show-all-levels="false"  filterable change-on-select style="width: 23%;"></el-cascader>
							<el-select v-model="selectedcareer" placeholder="职位" style="width: 23%;" >
						
						<el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select v-model="selectedsort" placeholder="考试时间" style="width: 23%;" >
				<el-option v-for="item in options2" :key="item.number" :label="item.value" :value="item.number"></el-option>
			</el-select>
					<el-select v-model="selectedtype" placeholder="类型" style="width: 23%;" >
				<el-option v-for="item in options3" :key="item.number" :label="item.value" :value="item.number"></el-option>
			</el-select>
			
			</div>
		</div>
		<scroller lock-x height="600px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
		<div style="margin-top: 150px;width: 90%;margin-left: auto;margin-right: auto;">
			<div class="testlist" v-for="(context,id) in testlist" :key="id" @click="gotonext(context)">
				<div style="text-decoration: none;">
					<flexbox>
						<flexbox-item :span="2/3">
							<div class="testcell-demo">
								<span class="testtitle"><b>{{context.name}}</b></span>
								<br>
								<span class="testplace" style="font-size: 14px;color: #999999;">{{context.province+context.city+context.area+context.place}}</span>
								<br>
								<span  class="testendtime" style="font-size: 12px;color: #999999;">{{'报名截止：'+context.signupEnd.substr(0,context.signupEnd.length-10)}}</span>
								<br>
								<span  class="testtime" style="font-size: 12px;color: #999999;">{{'考试时间：'+context.time.substr(0,context.time.length-10)}}</span>
								
							</div>
						</flexbox-item>
						<flexbox-item :span="1/3">
							<span style="float: right;color: #7AB9F6;">{{context.status}}</span>

						</flexbox-item>
					</flexbox>
				</div>
				<div v-if="showinf" v-transfer-dom>
					<alert  v-model="showinfo"  :content="'考试名称：'+info.name+'<br>考试时间：'+info.time.substr(0,info.time.length-10)+'<br>考试地点：'+info.province+info.city+info.area+info.place"></alert>
				</div>
			</div>

		</div>
		</scroller> 
	</div>
</template>

<script>
	import {
		XHeader,
		XInput,
		Group,
		Cell,
		Flexbox,
		FlexboxItem,
		XButton,
		 Alert,
		 TransferDomDirective as TransferDom,
		 Scroller,
		 LoadMore,
	} from 'vux'

	export default {
		 directives: {
			TransferDom
			},
		components: {
			XHeader,
			XInput,
			Group,
			Cell,
			Flexbox,
			FlexboxItem,
			XButton,
			 Alert,
			 Scroller,
			 LoadMore,
		},
		methods: {
			gotonext(content){
				if(content.status=="未报名")
					this.$router.push({path:'/baoming',query:{test:content}});
				else if(content.status=="已报名")
					this.$router.push({path:'/score',query:{test:content}});
				else{
					this.showinf=true;
					this.showinfo=true;
					this.info=content;
				}
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
			getkaoshilist() {
				if(this.selectedsort=='')
					this.selfsort=1
				else
					this.selfsort=this.selectedsort
				this.axios.get(this.yuming + '/msg/examination/schedule', {
						params: {
							type:this.selectedcareer,
							province:this.selectedquyu[0],
							city:this.selectedquyu[1],
							area:this.selectedquyu[2],
							status:this.selectedtype,
							number: this.bottomCount,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
							sort: this.selfsort,
						}
					})
					.then((response) => {
						console.log(response.data);
						this.testlist=response.data.data.list
					}).catch(error => {
						this.testlist=[]
						console.log(error);
					})
			},
			getsearchlist(){
						this.axios.get(this.yuming + '/msg/examination/search', {
										params: {
											number: this.bottomCount,
											token:localStorage.getItem('Authorization'),
											loginId: localStorage.getItem('loginid'),
											search:this.searchVal,
										}
									})
									.then((response) => {
										console.log(response.data);
										this.positionlist = response.data.data.info;
									}).catch(error => {
											this.positionlist=[];
											console.log(error);
				
										})
			},
		},
		created() {
			this.getkaoshilist();
			
		},
		watch:{
			searchVal(){
				this.getsearchlist();
			},
			bottomCount(newCount,oldCount){
				this.getkaoshilist();
			},
			selectedsort(newsort,oldsort){
				this.getkaoshilist();
			},
			selectedquyu(){
				if(this.selectedquyu[0]==undefined)
					this.selectedquyu[0]=""
				if(this.selectedquyu[1]==undefined)
					this.selectedquyu[1]=""
				if(this.selectedquyu[2]==undefined)
					this.selectedquyu[2]=""
				this.getkaoshilist();
			},
			selectedtype(){
			this.getkaoshilist();
			},
			selectedcareer(){
				this.getkaoshilist();

			}
		},
		
		data() {
			return {
				showinfo:false,
				showinf:false,
				info:[],
				selectedtype:'',
				selectedquyu:['','',''],
				selectedsort:'',
				selfsort:'',
				selectedcareer:'',
				bottomCount: 5,
				searchVal: '', //默认输入为空
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
			
				options2: [
				
					{
						number: 2,
						value: '距离最近'
					},
					{
						number: 5,
						value: '最新发布'
					},
					{
						number: 0,
						value: '最近召开'
					},	
				],
		
				options3: [{
						number:  '已报名',
						value: '已报名'
					},
					{
						number:  '未报名',
						value: '未报名'
					},
					{
						number: '已结束',
						value: '已结束'
					},
				],
				options4: [{
						value: '汽车修理工',
						label: '汽车修理工'
					},
					{
						value: '机修钳工',
						label: '机修钳工'
					},
					{
						value: '数控车工',
						label: '数控车工'
					},
					{
						value: '车工',
						label: '车工'
					},
					{
						value: '焊工',
						label: '焊工'
					},
					{
						value: '装配钳工',
						label: '装配钳工'
					},
					{
						value: '冷作钣金工',
						label: '冷作钣金工'
					},
					{
						value: '茶艺师',
						label: '茶艺师'
					},
				],
				testlist: [],
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

	.search .searchBox {
		padding: 0px !important;
		margin: 10px 15px !important;
		border-radius: 10px;
		border: 1px solid #7AB9F6;
	}
	.el-cascader-menu{
		height: auto;
		min-width: 30%;
	}
	.el-popover {
		left: 10px !important;
		min-width: 85%;
	}
	.v-transfer-dom .weui-dialog__bd{
		text-align: left !important;
		line-height: 35px;
	}
	.weui-mask{
		background: rgba(0, 0, 0, 0.4) !important;
	}
</style>
