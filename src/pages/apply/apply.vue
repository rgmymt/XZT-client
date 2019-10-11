<template>
	<div class="applypage">
		<div class="header">
			<x-header :left-options="{backText: ''}">
				<span style="margin-top:5px;font-size:17px;">求 职</span>
			</x-header>
			<div class="search" >
				<x-input title="搜索" type="text" placeholder="输入公司/职位" class="searchBox" v-model="searchVal" style="background-color:#FFFFFF;">
				<i class="iconfont icon-sousuo" slot="label" style="font-size: 24px;color: #CCCCCC;margin-right: 10px;padding-right:10px;display:block;" width="24" height="24"></i>
				</x-input>
			</div>
		
			<div style="margin:10px 5px;">
			
			</div>
			<div class="choosebox" style="width: 90%;margin-left: auto;margin-right: auto;">
			<el-cascader :options="options1" v-model="selectedquyu" placeholder="区域" :show-all-levels="false"   change-on-select style="width: 33%;border: 0px;"></el-cascader>
			<el-select v-model="selectedsort" placeholder="排序" style="width: 33%;" >
    <el-option v-for="item in options2" :key="item.number" :label="item.value" :value="item.number"></el-option>
  </el-select>
			
	<el-popover placement="bottom"  trigger="click" v-model="visible2">
		<span>薪资要求</span>
		<flexbox>
				<flexbox-item :span="1/10" style="margin: 0px;">
				<span>0</span>
			</flexbox-item>
			<flexbox-item :span="4/5" style="margin: 0px;">
		<el-slider v-model="value9" range show-stops :max="10000" :step="100" style="width: 90%;"> </el-slider>
		</flexbox-item>
			<flexbox-item :span="1/10" style="margin: 0px;">
			<span>不限</span>

			</flexbox-item>
		</flexbox>
   <br>
		<span>福利</span>
    	<checker v-model="fulichange" type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected">
    	<checker-item :value="fuli.value" v-for="(fuli, index) in fulioption" :key="index" style="margin-right: 15px;">{{fuli.label}}</checker-item>
    	</checker>
			<br>
		<span>年龄要求</span>
		   <checker v-model="agechange" type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected">
       <checker-item :value="1" >{{ '根据年龄筛选' }}</checker-item>
			</checker>
			<br>
		<span>职业性质</span>
			<checker v-model="xingzhichange" type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected">
    	<checker-item :value="xingzhi.value" v-for="(xingzhi, index) in xingzhioption" :key="index" style="margin-right: 15px;">{{xingzhi.label}}</checker-item>
			</checker>
			<el-button  plain @click="checkqingchu" style="width: 49%;margin: 0px;">清除</el-button>
		<el-button  plain @click="checkshaixuan" style="width: 49%;margin: 0px;background-color: #7AB9F6;color: #FFFFFF;">确定</el-button>
			<el-button v-if="selectedshaixuan" plain slot="reference" style="width: 30%;padding-right: 10px;">筛选<i class="el-icon-arrow-down el-icon--right" style="float: right;"></i></el-button>
		<el-button v-else plain slot="reference" style="width: 30%;padding-right: 10px;color: #c0c4cc;">筛选<i class="el-icon-arrow-down el-icon--right" style="float: right;"></i></el-button>
  </el-popover>
	</div>
		</div>

		<scroller lock-x height="-50" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
		
		<div style="padding-top: 180px;z-index: -1;">
			<div class="positionlist" v-for="(context,id) in positionlist" :key="id" @click="$router.push({path:'/applydetil',query:{applyid:context.id}})">
				
					<flexbox>
						<flexbox-item :span="1/4">
							<div class="positioncell-demo">
							
								<img v-if="context.cover!=null" class="positionimg" :src="yuming.substr(0,yuming.length-5)+context.cover.substr(1)"></img>
							</div>
						</flexbox-item>
						<flexbox-item :span="2/3">
							<div class="positioncell-demo">
								<span class="positiontitle">{{context.company+'--'+context.career}}</span>
								<br>
								<span class="positionsarly">{{context.salary}}元/月</span>
								<span class="positiondeadline" style="float: right;">{{'截止时间：'+context.deadline.substr(0,context.deadline.length-10)}}</span>

								<br>
								
								<span class="positionplace" >{{context.province+context.city+context.area}}</span>
							</div>
						</flexbox-item>
					</flexbox>
				
			</div>
			
		</div>
			
		
		</scroller>
	</div>
</template>

<script>
	import {
		XHeader,
		Flexbox,
		FlexboxItem,
		XInput,
		Popover,
		Scroller,
		LoadMore,
		 Checker,
    CheckerItem,
	} from 'vux'

	export default {
		components: {
			XHeader,
			Flexbox,
			FlexboxItem,
			XInput,
			Popover,
			Scroller,
			LoadMore,
			 Checker,
			CheckerItem,
		},
		watch:{
		searchVal(){
			this.getsearchlist();
		},
			bottomCount(newCount,oldCount){
				this.getzhaopin();
			},
			selectedsort(newsort,oldsort){
				this.getzhaopin();
			},
			selectedquyu(){
				if(this.selectedquyu[0]==undefined)
					this.selectedquyu[0]=""
				if(this.selectedquyu[1]==undefined)
					this.selectedquyu[1]=""
				if(this.selectedquyu[2]==undefined)
					this.selectedquyu[2]=""
				this.getzhaopin();
			},
			agechange(){
				this.age=!this.age
			},
			fulichange(){
				console.log(this.fulichange)
				this.fuli=''
				for(var i=0;i<this.fulichange.length;i++)
					this.fuli+=this.fulichange[i]+';'
					console.log(this.fuli)

			},
			xingzhichange(){
				console.log(this.xingzhichange)
				this.xingzhi=''
				for(var i=0;i<this.fulichange.length;i++)
					this.xingzhi+=this.fulichange[i]+';'
					console.log(this.xingzhi)
			}
		},
		data() {
			return {
				visible2:false,
				value9:[0,10000],
				salaryLow: 0,
				salaryHigh: 10000,
				selectedsort:'',
				selfsort:'',
				selectedquyu:["","",""],
				searchVal: '', //默认输入为空
				age:false,
				agechange:[],
				bottomCount: 5,
				selectedshaixuan:false,
				fulichange:'',
				xingzhichange:'',
				xingzhi:'',
				fuli:'',
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
						value: '薪水最高'
					},
					{
						number: 0,
						value: '最近截止'
					},
					
				
				],
				xingzhioption:[	
					{
						value: '派遣工',
						label: '派遣工'
					},
					{
						value: '正式工',
						label: '正式工'
					},
					{
						value: '临时工',
						label: '临时工'
					},
					{
						value: '外包工',
						label: '外包工'
					},
			
				],
				fulioption:[
					{
						value: '五险一金',
						label: '五险一金'
					},
					{
						value: '包吃包住',
						label: '包吃包住'
					},
					{
						value: '餐补',
						label: '餐补'
					},
					{
						value: '住宿补贴',
						label: '住宿补贴'
					},
				],
				positionlist: []
			}
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
		
			checkshaixuan(){
				console.log('s')
				this.salaryLow=this.value9[0]
				if(this.value9[1]==10000)
				this.salaryHigh=999999
				else
				this.salaryHigh=this.value9[1]
				this.visible2=false
				console.log('s')

				console.log(this.salaryLow)
				console.log(this.salaryHigh)
				console.log(this.fulichange.length)
				console.log(this.xingzhichange.length)
				console.log(this.agechange.length)
				if(this.salaryLow==0&&this.salaryHigh==999999&&this.fulichange.length==0&&this.xingzhichange.length==0&&this.age==false)
					this.selectedshaixuan=false
				else
					this.selectedshaixuan=true
				this.getzhaopin()
			},
			checkqingchu(){
				this.salaryLow=0
				this.salaryHigh=10000
				this.selectedshaixuan=false
				this.fulichange=''
				this.xingzhichange=''
				this.agechange=[]
				//this.age=false
			
			},
			getsearchlist(){
						this.axios.get(this.yuming + '/msg/recruit/search', {
										params: {
											number: this.bottomCount,
											token:localStorage.getItem('Authorization'),
											loginId: localStorage.getItem('loginid'),
											longitude: 30.3115975656,
											latitude: 120.3906297684,
											search:this.searchVal,
										}
									})
									.then((response) => {
										console.log(response.data.data.info);
										this.positionlist = response.data.data.info;
									}).catch(error => {
											this.positionlist=[];
											console.log(error);
				
										})
			},
			getzhaopin() {
				if(this.selectedsort=='')
					this.selfsort=1
				else
					this.selfsort=this.selectedsort
					console.log(this.age)
				this.axios.get(this.yuming + '/msg/list/recruit', {
						params: {
							career: '',
							province:this.selectedquyu[0],
							city:this.selectedquyu[1],
							area:this.selectedquyu[2],
							age:this.age,
							salaryLow: this.salaryLow,
							salaryHigh: this.salaryHigh,
							number: this.bottomCount,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
							longitude: 30.3115975656,
							latitude: 120.3906297684,
							tag: this.fuli,
							nature:this.xingzhi,
							sort: this.selfsort,
						}
					})
					.then((response) => {
						console.log(response.data.data.info);
						this.positionlist = response.data.data.info;
					}).catch(error => {
							this.positionlist=[];
							console.log(error);

						})
			}
		},
		created() {
			this.getzhaopin();
			console.log(this.sortself);
		},
		mounted(){
			var body=document.getElementsByClassName('applypage')[0]
			body.style.height=`${document.documentElement.clientHeight}`+'px'
			body.style.backgroundColor="#FFFFFF"
		},
		

	}
</script>

<style>
.choosebox .el-input__inner{
	border: 0px !important;
}
.choosebox .el-button{
	border: 0px !important;
}
	.header {
		position: fixed;
		width: 100%;
	background-color:#FFFFFF;
		z-index: 2;
	}
	.check-item{
		border-radius: 10px;
		background-color: #EBEBEB;
		border:1px solid #c0c4cc;
		border: 1px solid #ececec;
		padding: 5px 5px;
		margin:10px 5px ;
	}
	.check-item-selected{
		background-color: #E0F0F0;
		border:1px solid #7AB9F6;
		color: #7AB9F6;
	}
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

	.input {
		border: 0px;
		width: 80% !important;
		height: 30px;
		font-size: 17px;
		text-align: center;
	}

	
	.el-cascader-menu{
		height: auto;
		min-width: 30%;
	}
	.el-popover {
		left: 10px !important;
		min-width: 85%;
	}
	/* .popper__arrow{
		left: 80% !important;
	} */

	.header .vux-flexbox {
		height: 40px;
		box-shadow: 0px 3px 10px #DBDBDB;
		background-color: #FFFFFF;
		margin-top: 45px;
	}

	.positionimg {
		width: 100%;
		height: 60px;

	}

	.positionlist {
		margin-top: 5px;
	}

	.positionlist .vux-flexbox {
		width: 94% !important;
		margin-left: 3%;
		margin-right: 3%;
	}

	.positiondeadline {
		font-size: 10px;
		color: #ABABAB;
	}

	.positionsarly {
		color: #EE0000;
		font-size: 12px;

	}

	.positiontitle {
		font-size: 17px;
		color: #000000;
	}

	.positioncell-demo {
		line-height: 20px;
	}

	.positionplace {
		color: #ABABAB;
		font-size: 11px;
		line-height: 16px;
	
	}
	.search .searchBox{
		padding: 0px !important;
		margin: 10px 15px !important;
		border-radius: 10px;
		border: 1px solid #7AB9F6;
	}
	.popover-demo-content{
		display: none;
	}
</style>
