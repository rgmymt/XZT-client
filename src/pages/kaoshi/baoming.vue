<template>
	<div style="width: 100%;">
	<x-header :left-options="{backText: ''}">
		<span style="margin-top:5px;font-size:17px;">考试报名</span>
	</x-header>
	<flexbox :gutter="0" wrap="wrap" style="margin-top: 30px;padding-left: 30px;line-height: 50px;width: 90%;margin-left: auto;margin-right: auto;">
      <flexbox-item :span="1/3"><div class="sign-demo">考试名称：</div></flexbox-item>
      <flexbox-item :span="2/3"><div class="sign-demo">{{testdetil.title}}</div></flexbox-item>
	  <flexbox-item :span="1/3"><div class="sign-demo">当前状态：</div></flexbox-item>
	  <flexbox-item :span="2/3"><div class="sign-demo">{{testdetil.myStatus}}</div></flexbox-item>
	  <flexbox-item :span="1/3"><div class="sign-demo">考试地点：</div></flexbox-item>
	  <flexbox-item :span="2/3"><div class="sign-demo">{{testdetil.province+testdetil.city+testdetil.area+testdetil.place}}</div></flexbox-item>
	  <flexbox-item :span="1/3"><div class="sign-demo">考试费用：</div></flexbox-item>
	  <flexbox-item :span="2/3"><div class="sign-demo">{{'￥'+testdetil.fee}}</div></flexbox-item>
	  <flexbox-item :span="1/3"><div class="sign-demo">考试时间：</div></flexbox-item>
	  <flexbox-item :span="2/3"><div class="sign-demo">{{testdetil.launchingTime}}</div></flexbox-item>
	  <flexbox-item :span="1/3"><div class="sign-demo">报名截止：</div></flexbox-item>
	  <flexbox-item :span="2/3"><div class="sign-demo">{{testdetil.endTime}}</div></flexbox-item>
  
		</flexbox>
		<div style="margin-left: 33px;margin-top:10px ;">
		<span>考试要求：</span>
		<br>
		<div style="margin-top:20px ;">{{testdetil.introduction}}</div>
		</div>
		<x-button type="primary" @click.native="showpay=true" style="width: 30%;margin-left: 35%;margin-top: 100px;">去缴费</x-button>
	 <div v-transfer-dom>
      <popup v-model="showpay" >
        <div class="paydemo">
		<div style="text-align: center;line-height: 50px;border-bottom: 0.2px solid #CCCCCC;">
			<span style="font-size: 25px;margin-left: 60px;">确认付款</span>
         <x-icon type="ios-close-empty" size="50" style="vertical-align: middle;float: right;z-index: 2;" @click.native="showpay=false"></x-icon>
		</div>
		<br>
		<div style="font-size: 40px;margin-left: auto;text-align: center;">{{'￥'+testdetil.fee}}</div>
        <div style="line-height: 40px;margin-left: 20px;padding-bottom: 40px;">
			<span style="color: #999999;">订单金额：</span><span style="float: right;margin-right: 20px;">{{'￥'+testdetil.fee}}</span>
			<br>
			<span style="color: #999999;">支付宝账号：</span><span style="float: right;margin-right: 20px;">172******32</span>
			<br>
			<span style="color: #999999;">付款方式：</span><span style="float: right;margin-right: 20px;">余额宝</span>
		</div>
		<div style="font-size: 15px;text-align: center;padding-bottom: 10px;">
			<i class="iconfont icon-fingerprint__"  style="font-size: 35px;color: #999999;padding-right:10px;" ></i>
			<span style="color: #999999;">请验证指纹或者</span><span style="color: #7AB9F6"> 输入密码</span>
		</div>
		</div>	
      </popup>
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
			Popup, 
			
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
				Popup, 
				
			},
			methods:{
				postexamdetil(){
						this.axios.get(this.yuming + '/msg/examination/schedule/detail', {
								params: {
									examID:this.test.examID,
									token:localStorage.getItem('Authorization'),
									loginId: localStorage.getItem('loginid'),
								}
							})
							.then((response) => {
								console.log(response.data);
								this.testdetil=response.data.data
							}).catch(error => {
							
								console.log(error);
							})
					}
			},
			created() {
				this.test=this.$route.query.test
				console.log(this.test)
				this.postexamdetil()
			},
			data() {
				return {
					test:[],
					showpay:false,
					testdetil:[],
					 
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
</style>
