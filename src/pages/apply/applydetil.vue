<template>
	<div class="applydetil">
		<div class="applydetil-header" style="width: 100%;">
		<x-icon type="ios-arrow-left" size="30" style="float:left;position: fixed;top:5px;fill:#FFFFFF"  @click="$router.go(-1)"></x-icon>
			<img v-if="companyimg!=null" style="width: 100%;height: 200px;" :src="yuming.substr(0,yuming.length-5)+companyimg.substr(1)"></img>

		<flexbox style="margin-top: 0px;width: 95%;margin-left: 1%;">
			<flexbox-item :span="1/3">
				<div class="positioninfo-demo" style="float: left;">
					<span>{{company}}</span>	
					<span style="margin-left: 10px;">{{career}}</span>
					<br>
					<span style="font-size: 12px;line-height: 40px;color: #757575;">{{'招收'+zhaoshou+'人'}}</span>
				</div>
			</flexbox-item>
			<flexbox-item :span="2/3">
				<div class="positioninfo-demo" >
					<span style="float: right;color: #FF0000;">{{salary+'元/月'}}</span>	
					<br>
					<span  v-if="deadline!=null" style="float: right;font-size: 12px;line-height: 40px;color: #757575;">{{'截止时间:'+deadline.substr(0,deadline.length-2)}}</span>
				</div>
			</flexbox-item>
		</flexbox>
		</div>
		<div class="address" style="border-bottom: 0.1px solid #EDEDED;">
			  <cell :title="company"  :inline-desc="addressdetil" :link="{path:'/map',query:{latitude:latitude,longitude:longitude,conpany:company,address:addressdetil}}">
				  <i class="iconfont icon-weizhi" slot="icon" style="font-size: 25px;color: #7AB9F6;margin-right: 10px;"></i>
			  </cell>
		</div>
		
			<div class="xinzi">
			<i class="iconfont icon-title" slot="icon" style="vertical-align: middle;font-size: 15px;color: #7AB9F6;margin-right: 10px;"></i>
			<span style="margin-left: -15px;font-size: 15px;">薪资待遇</span>
			<div class="applydetil-content">
				<span>{{'综合工资：'+salary+'元/月'}}</span>
			</div>
			</div>
			<div class="fuli">
			<i class="iconfont icon-title" slot="icon" style="vertical-align: middle;font-size: 15px;color: #7AB9F6;margin-right: 10px;"></i>	
			<span style="margin-left: -15px;font-size: 15px;">福利待遇</span>
			<div class="applydetil-content">
				
			</div>
			</div>
			<div class="gznr">
			<i class="iconfont icon-title" slot="icon" style="vertical-align: middle;font-size: 15px;color: #7AB9F6;margin-right: 10px;"></i>	
			<span style="margin-left: -15px;font-size: 15px;">工作内容</span>
			<div class="applydetil-content">
				<span>{{introduction}}</span>
			</div>
			</div>
			<div class="gzsj">
			<i class="iconfont icon-title" slot="icon" style="vertical-align: middle;font-size: 15px;color: #7AB9F6;margin-right: 10px;"></i>		
			<span style="margin-left: -15px;font-size: 15px;">工作时间</span>
			<div class="applydetil-content">
				<span>{{worktime}}</span>
			</div>
			</div>
			
			<div v-if="baoming"  @click="baoming=!baoming">
		 <x-button type="primary" style="width: 80%;position: fixed;bottom: 20px;height: 30px;font-size: 13px;margin-left: 10%" >立刻报名</x-button>
			</div>
			<div v-else>
			<x-button type="primary" disabled style="width: 80%;position: fixed;bottom: 20px;height: 30px;font-size: 13px;margin-left: 10%" >报名成功</x-button>
			</div>
	
	</div>
</template>

<script>
	import {
			Cell,
			Flexbox,
			FlexboxItem,
			XButton,
		} from 'vux'
	
		export default {
			components: {
				Cell,
				Flexbox,
				FlexboxItem,
				XButton,
			},
			methods:{
		getapplycontent() {
			console.log(this.$route.query.applyid)
			console.log('b')
			
			this.axios.get(this.yuming + '/msg/recruit/detail', {
					params: {
						postID:this.$route.query.applyid,
					token:localStorage.getItem('Authorization'),
					loginId: localStorage.getItem('loginid'),
					}
				})
				.then((response) => {
					console.log(response.data)
					this.salary= response.data.recruitDetail.salary
					this.company=response.data.company.name
					this.companyimg=response.data.company.cover
					this.career=response.data.recruitDetail.career
					this.zhaoshou=response.data.recruitDetail.number
					this.deadline=response.data.recruitDetail.deadline
					this.addressdetil=response.data.recruitDetail.workPlace					
					this.introduction=response.data.recruitDetail.introduction
					this.worktime=response.data.recruitDetail.workTime
					this.latitude=response.data.recruitDetail.latitude
					this.longitude=response.data.recruitDetail.longitude
				})
		}
	},
	created(){
		this.getapplycontent()
	},
	mounted(){
		var body=document.getElementsByClassName('applydetil')[0]
		body.style.height=`${document.documentElement.clientHeight}`+'px'
		body.style.backgroundColor="#FFFFFF"
	},
			data() {
				return {
					baoming:true,
					companyimg:'',
					company:'',
					career:'',
					zhaoshou:null,
					salary:null,
					deadline:'',
					addressdetil:'',
					introduction:'',
					worktime:'',
					latitude:'',
					longitude:'',
					}
			}
	}
</script>

<style>
	.applydetil-content{
		margin-left: 8%;
		font-size: 11px;
		line-height: 20px;
	}
	.applydetil-header{
		border: 0.5px solid #E3E3E3;
		box-shadow: 0px 3px 3px #E3E3E3;
	}
	.address /deep/ p{
		font-size: 14px;
		margin-top: 0px !important;
		margin-bottom: 0px !important;
	}
	.vux-label-desc{
		font-size: 10px !important;
	}
</style>
