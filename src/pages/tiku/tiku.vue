<template>
		<div class="tikupage">
			<div style="background-color:#7AB9F6 ;height: 47px;position: fixed;top: 0px;width: 100%;">
				<flexbox :gutter="0" style="padding-top: 5px;">
					<flexbox-item :span="1/10">
						<div class="flex-demo">
							<x-icon type="ios-arrow-left" size="30" style="fill:#FFFFFF;" @click="$router.go(-1)"></x-icon>
						</div>
					</flexbox-item>
					<flexbox-item :span="7/10">
						<div class="flex-demo">
							<div class="search" style="font-size: 13px;">
								<x-input title="搜索" type="text" placeholder="搜索关键字" class="searchBox" v-model="searchVal" style="background-color:#FFFFFF;">
									<i class="iconfont icon-sousuo" slot="label" style="font-size: 24px;color: #CCCCCC;margin-left: 5px;margin-right: 5px;display:block;"
									 width="24" height="24"></i>
								</x-input>
							</div>
						</div>
					</flexbox-item>
					<flexbox-item :span="1/4" >
						<div class="flex-demo" style="margin-left: 20px;"  @click="$router.push({path:'/errorbook'})">
							<img  src="../../assets/icon/cuoti.png" style="width: 25px;">
							<div style="font-size: 12px;margin-top: -6px;color: #FFFFFF;margin-left: -4px;">错题本</div>
						</div>
					</flexbox-item>
				</flexbox>
			</div>
			<img src="../../assets/img/tikuheader.png" style="width: 100%;height: 200px;">
			<span style="font-size: 15px;margin-left: 5px;">热门搜索</span>
			<div style="width: 95%;margin-top: 5px;">
				<span class="hot-cell" v-for="(hotsearch,id) in hotlist" :key="id" @click="searchVal=hotsearch">
					{{hotsearch}}
				</span>
			</div>
	
		<div>
		
				<div class="paper-cell" v-for="(paperele,index) in list" :key="index">
				<div @click="dialog(paperele)">
				{{paperele.name}}
				</div>
				</div>
			<el-dialog :title="checkednow.name" :visible.sync="dialogTableVisible" :show-close="false" style="margin-top: 130px;">
					<el-button type="text" @click="$router.push({path:'/moni',query:{paperid:checkednow.groupID,papertitle:checkednow.name}})">点击进入模拟考试</el-button>
					<el-button style="margin-left: 0px;" type="text" @click="$router.push({path:'/paper',query:{paperid:checkednow.groupID,papertitle:checkednow.name}})">点击进入题库练习</el-button>
			</el-dialog>
			
		
		</div>

	</div>
</template>

<script>
	import {
		Flexbox,
		FlexboxItem,
		XInput,
		Group,
		Cell,
		XButton
	} from 'vux'

	export default {
		components: {
			Flexbox,
			FlexboxItem,
			XInput,
			Group,
			Cell,
			XButton
		},
		computed: {
			list: function() {
				var arrByZM = []; //声明一个空数组来存放数据
				console.log(this.paperlist)
				for (var i = 0; i < this.paperlist.length; i++) {
					for(var j=0;j<this.paperlist[i].groupData.info.length;j++){
					if (this.paperlist[i].groupData.info[j].name.search(this.searchVal) != -1 || this.searchVal == '') {
						arrByZM.push(this.paperlist[i].groupData.info[j]);
					}
				}
			}
			console.log(arrByZM)
				return arrByZM;
			},
		},
		methods:{
			dialog(content){
				this.dialogTableVisible = true
				this.checkednow=content
			},
			gettikulist() {
						this.axios.get(this.yuming + '/msg/questionbank', {
								params: {
									token:localStorage.getItem('Authorization'),
									loginId: localStorage.getItem('loginid'),
								}
							})
							.then((response) => {
								console.log(response.data)
								this.paperlist=response.data.data.type
								
							})
					}
		},
		created() {
			this.gettikulist()
		},
		data() {
			return {
				searchVal: '', //默认输入为空
				dialogTableVisible:false,
				checkednow:[],
				hotlist: [
					'焊工',
					'电工',
					'育婴员',
					'电梯安装维修工',
					'焊工',
					'电工',
					'育婴员',
					'电梯安装维修工',
				],
				paperlist: [
					
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

	.tikupage .vux-header-title {
		margin: 5px 40px;
		margin-top: 5px;
		margin-bottom: 5px;
		margin-left: 40px;
		margin-right: 80px;

	}

	.search .searchBox {
		padding: 0px !important;

		height: 30px;
		border-radius: 10px;
		border: 1px solid #7AB9F6;
	}

	.hot-cell {
		border-radius: 10px;
		border: 0.5px solid #7AB9F6;
		margin-left: 10px;
		line-height: 30px;
		font-size: 12px;
		padding: 2px 4px;
	}

	.paper-cell {
		padding: 20px 10px;
		border-bottom: 0.1px solid #D6D6D6;
		width: 90%;
		font-size: 13px;
		color: #696969;
		margin-left: auto;
		margin-right: auto;
	}
</style>
