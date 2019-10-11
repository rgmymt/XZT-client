<template>
	<div class="employdetil">
		<div class="employdetil-header" style="position: fixed;width: 100%;top:0px;padding-top: 10px;">
		<x-icon type="ios-arrow-left" size="30" style="float:left;fill:#7AB9F6"  @click="$router.go(-1)"></x-icon>
		</div>
		<div class="employdetil-title" style="text-align: center;margin-top: 40px;font-size: 20px;margin-bottom: 10px;">	
			<span>{{employcontent.title}}</span>
		</div>
		<div class="address" style="border-bottom: 0.1px solid #EDEDED;color:#999999" >
			  <cell :title="employcontent.launchingTime"  :inline-desc="employcontent.province+employcontent.city+employcontent.area+employcontent.launchingPlace" :link="{path:'/map',query:{latitude:employcontent.latitude,longitude:employcontent.longitude,conpany:employcontent.title,address:employcontent.province+employcontent.city+employcontent.area+employcontent.launchingPlace}}">
				  <i class="iconfont icon-weizhi" slot="icon" style="font-size: 20px;color: #7AB9F6;margin-right: 10px;"></i>
			  </cell>
		</div>
			<div style="margin: 4%;">
			<div class="xuanjianghui-des">
			<i class="iconfont icon-title" slot="icon" style="vertical-align: middle;font-size: 15px;color: #7AB9F6;margin-right: 10px;"></i>
			<span style="margin-left: -15px;font-size: 15px;">宣讲会描述</span>
			<div class="employdetil-content">
				<span style="font-size: 13px;">{{employcontent.content}}</span>
			</div>
			</div>
			<div class="company-des" style="margin-top: 10px;padding-bottom: 40px;">
			<i class="iconfont icon-title" slot="icon" style="vertical-align: middle;font-size: 15px;color: #7AB9F6;margin-right: 10px;"></i>	
			<span style="margin-left: -15px;font-size: 15px;">公司简介</span>
			<div class="employdetil-content" v-for="(company,id) in companydes" :key="id">
				<span style="font-size: 13px;">{{company.name}}</span>
				<br>
				<span v-for="(job,index) in company.jobData.jobList" :key="index" style="font-size: 12px;color: #999999;">
				{{'招收'+job.number+'名'+job.job+'；'}}
				</span>
				<br>
				<span style="font-size: 10px;color: #999999;margin-left: -10px;">{{company.introduction}}</span>
			</div>
			</div>
			<div v-if="shoucang"  @click="shoucangtrue">
			<x-button type="primary" style="width: 80%;position: fixed;bottom: 10px;margin-left: 10%;" >添加到收藏</x-button>
			</div>
			<div v-else @click="shoucangchange">
			<x-button type="primary" style="width: 80%;position: fixed;bottom: 10px;margin-left: 10%;background-color:#afc9f8;" >已收藏</x-button>
			</div>
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
						shoucangtrue(){
							this.shoucang=!this.shoucang
							this.postshoucang()

						},
						shoucangchange(){
							this.shoucang=!this.shoucang
							this.postquxiao()
						},
				getemploycontent() {
					this.axios.get(this.yuming + '/jobFair/detail', {
							params: {
								ID:this.$route.query.employid,
								longitude: 30.3115975656,
								latitude: 120.3906297684,
							token:localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
							}
						})
						.then((response) => {
							
							this.employcontent=response.data.data
							this.companydes=response.data.data.info
							console.log(this.employcontent)
					
						})
				},
					postquxiao(){
				
									this.axios({
													method:"post",
													url:this.yuming +'/jobFair/collect/quit'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
													dataType:'json',
													data:{
															loginId:localStorage.getItem('loginid'),
															jobFairID:this.$route.query.employid,
													}
										})
										.then((response) => {
											console.log(response.data);
											
										})
								},
				postshoucang(){
			
								this.axios({
												method:"post",
												url:this.yuming +'/jobFair/collect'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
												dataType:'json',
												data:{
														loginId:localStorage.getItem('loginid'),
														jobFairID:this.$route.query.employid,
												}
									})
									.then((response) => {
										console.log(response.data);
										
									})
							}
			},
			created(){
				this.getemploycontent()
			},
			mounted(){
				var body=document.getElementsByClassName('employdetil')[0]
				body.style.height=`${document.documentElement.clientHeight}`+'px'
				body.style.backgroundColor="#FFFFFF"
			},
			data() {
				return {
					shoucang:true,
					employcontent:[],
					companydes:[],
					time:'2019年4月22日14:30',
					addressdetil:'杭州市江干区白杨街道228号403室',
					}
			}
	}
</script>

<style>
	.employdetil-content{
		margin-left: 8%;
	
	}
	.employdetil-header{
		background-color: #FFFFFF;
	
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
