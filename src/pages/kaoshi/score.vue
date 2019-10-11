<template>
	<div>
	<x-header :left-options="{backText: ''}">
		<span style="margin-top:5px;font-size:17px;">成绩查询</span>
	</x-header>
	<flexbox :gutter="0" wrap="wrap" style="margin-top: 30px;padding-left: 30px;line-height: 50px;width: 80%;margin-left: auto;margin-right: auto;">
			<flexbox-item :span="1/3"><div class="check-demo">考试名称：</div></flexbox-item>
			<flexbox-item :span="2/3"><div class="check-demo">{{test.name}}</div></flexbox-item>
		
		<flexbox-item :span="1/3"><div class="check-demo">准考证号：</div></flexbox-item>
		<flexbox-item :span="2/3"><div class="check-demo">
		 <x-input    :show-clear="false" v-model="testid" style="padding-left:0px ;width: 70%;"></x-input>
		</div></flexbox-item>
		</flexbox>
		<x-button type="primary" @click.native="check" style="width: 30%;margin-left: 35%;margin-top: 100px;">查询</x-button>
		<div v-transfer-dom>
      <alert v-model="showscore" :title="'成绩'" > 
	  <div style="font-size: 25px;color:#000000;text-align: center;">
	  {{ info.score }}
	  </div>
	  </alert>
		</div>
		<div v-transfer-dom>
		<alert v-model="showtishi" :title="'提示'" style="font-size: 15px;"> {{ tishi }}</alert>
		</div>
	</div>
</template>

<script>
	import {
			XHeader,
			Flexbox,
			FlexboxItem,
			XButton,
			TransferDom, 
			Alert,
			XInput
		} from 'vux'
	
		export default {
			directives: {
				TransferDom
			},
			components: {
				XHeader,
				Flexbox,
				FlexboxItem,
				XButton,
				Alert,
				XInput
			},
			methods:{
				check(){
					if(this.testid==''){
						this.showtishi=true
						this.tishi='请输入准考证'
					}
					else{
						this.getscore()
					}
				
				},
				getscore(){
					this.axios.get(this.yuming + '/examination/grades', {
							params: {
								ExamineeNumber:this.testid,
								token:localStorage.getItem('Authorization'),
								loginId: localStorage.getItem('loginid'),
							}
						})
						.then((response) => {
							console.log(response.data);
							this.showscore=true
							this.info=response.data
						}).catch(error => {
							this.showtishi=true
							this.tishi='请输入正确的准考证'
							console.log(error);
						})
				}
			},
			data() {
				return {
					test:[],
					showscore:false,
					showtishi:false,
					info:[],
					testtitle:'维修电工4级',
					testid:'',
					tishi:'',
				}
			},
			created() {
				this.test=this.$route.query.test
				console.log(this.test)
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
	.check-demo input {
		border: 0.5px solid #CCCCCC !important;
	}
	
</style>

