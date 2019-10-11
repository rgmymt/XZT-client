<template>
	<div>
		<div class="header">
			<x-header :left-options="{backText: ''}">
				<span style="margin-top:5px;font-size:17px;">求 职</span>
			</x-header>
			<div class="search" >
				<x-input title="搜索" type="text" placeholder="  输入公司或职位" class="searchBox" v-model="searchVal" style="background-color:#FFFFFF;">
				<i class="iconfont icon-sousuo" slot="label" style="font-size: 24px;color: #CCCCCC;margin-right: 10px;padding-right:10px;display:block;" width="24" height="24"></i>
				</x-input>
			</div>
			<div style="margin:10px 5px;">
				<span>薪资要求</span>
				<input type="text" v-model="salaryLow" style="width: 30%;"></input>
				<span>-</span>
				<input type="text" v-model="salaryHigh" style="width: 30%;"></input>
			</div>
			<flexbox style="margin-top: 0px;">
				<flexbox-item>
					<div class="select-demo">
						<popover placement="bottom" style="margin: 20px;">
							<div slot="content" class="popover-demo-content">
								<div class="select-cell" v-for="(option,id) in options1" :key="id">
									{{option}}
								</div>
							</div>
							<button class="select-btn">{{ '区域' }}</button>
						</popover>

					</div>
				</flexbox-item>
				<flexbox-item>
					<div class="select-demo">
						<popover placement="bottom" style="margin: 20px;">
							<div slot="content" class="popover-demo-content">
								<div class="select-cell" v-for="(option,id) in options2" :key="id" v-on:click="sortselect(option.number)">
									{{option.value}}
								</div>
							</div>
							<button class="select-btn">{{ '排序' }}</button>
						</popover>

					</div>
				</flexbox-item>
				<flexbox-item>
					<div class="select-demo">
						<popover placement="bottom" style="margin: 20px;">
							<div slot="content" class="popover-demo-content">
								<div class="select-cell">

									<br>
									<br>
								</div>
							</div>
							<button class="select-btn">{{ '筛选' }}</button>
						</popover>

					</div>
				</flexbox-item>
			</flexbox>
		</div>


		<div style="padding-top: 140px;">
			<div class="positionlist" v-for="(context,id) in list" :key="id">
				<router-link to="/applydetil" style="text-decoration: none;">
					<flexbox>
						<flexbox-item :span="1/4">
							<div class="positioncell-demo">
								<img v-if="context.cover!=null" class="positionimg" :src="yuming+context.cover.substr(1)"></img>
							</div>
						</flexbox-item>
						<flexbox-item :span="2/3">
							<div class="positioncell-demo">
								<span class="positiontitle">{{context.company+'--'+context.career}}</span>
								<br>
								<span class="positionsarly">{{context.salary}}元/月</span>

								<br>
								<span class="positiondeadline">{{'截止时间：'+context.deadline.substr(0,context.deadline.length-2)}}</span>

								<span class="positionplace" style="float: right;">{{context.location}}</span>
							</div>
						</flexbox-item>
					</flexbox>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		XHeader,
		Flexbox,
		FlexboxItem,
		XInput,
		Popover
	} from 'vux'

	export default {
		components: {
			XHeader,
			Flexbox,
			FlexboxItem,
			XInput,
			Popover
		},
		data() {
			return {

				salaryLow: 0,
				salaryHigh: 999999,
				sortself: 0,

				searchVal: '', //默认输入为空

				options1: [
					'江干区',
					'杭州市',
					'上城区',
					'下城区',
					'拱墅区',
				],
				options2: [{
						number: 0,
						value: '0'
					},
					{
						number: 1,
						value: '1'
					},
					{
						number: 2,
						value: '2'
					},
					{
						number: 3,
						value: '3'
					},
					{
						number: 4,
						value: '4'
					},
					{
						number: 5,
						value: '5'
					},
				],
				positionlist: []
			}
		},
		methods: {
			sortselect(sorttype) {
				this.sortself = sorttype;
				this.getzhaopin();
			},
			getzhaopin() {
				this.axios.get(this.yuming + '/test/msg/list/recruit', {
						params: {
							career: '',
							location: '杭州',
							salaryLow: this.salaryLow,
							salaryHigh: this.salaryHigh,
							number: 4,
							token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTQ3MzYyOTYxNDMsInBheWxvYWQiOiJ7XCJwaG9uZVwiOlwiQVwiLFwicGFzc3dvcmRcIjpcIkJcIixcInVzZXJJRFwiOjF9In0.woq-9Hrwd-pg2lNh4CjWb1qkV0jBrL-oTipz5EKm6Gc',
							loginId: 1,
							longitude: 30.3115975656,
							latitude: 120.3906297684,
							tag: '',
							sort: this.sortself,
						}
					})
					.then((response) => {
						console.log(response.data.data.info);
						this.positionlist = response.data.data.info;
					})
			}
		},
		created() {
			this.getzhaopin();
			console.log(this.sortself);
		},
		computed: {
			list: function() {
				var arrByZM = []; //声明一个空数组来存放数据
				for (var i = 0; i < this.positionlist.length; i++) {
					if (this.positionlist[i].company.search(this.searchVal) != -1 || this.searchVal == '' || this.positionlist[i].career
						.search(this.searchVal) != -1) {
						arrByZM.push(this.positionlist[i]);
					}
				}
				return arrByZM;
			},
		},

	}
</script>

<style>
	.header {
		position: fixed;
		width: 100%;
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

	.select-demo {
		text-align: center;
	}

	.select-btn {
		border: 0px;
		background-color: #FFFFFF;
	}

	.select-cell {
		padding: 5px 0px;

	}

	.popover-demo-content {
		background-color: #7AB9F6;
		padding: 5px 10px;
	}

	.vux-popover-arrow-up {
		border-bottom: 5px solid #7AB9F6 !important;
	}

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
		font-size: 15px;
		color: #000000;
	}

	.positioncell-demo {
		line-height: 20px;
	}

	.positionplace {
		color: #ABABAB;
		font-size: 13px;
		line-height: 16px;
		float: right;
	}
	.search .searchBox{
		padding: 0px !important;
		margin: 10px 15px !important;
		border-radius: 10px;
		border: 1px solid #7AB9F6;
	}
</style>
