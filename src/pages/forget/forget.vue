<template>
    <!-- <x-header :left-options="{backText: ''}" id="Header_1">忘记密码</x-header> -->
<div>
    <x-header :left-options="{backText: ''}" >
		<span style="margin-top:5px;font-size:17px;">忘记密码</span>
	</x-header>
    <div >
        <br>
        <input type="text" placeholder="请输入手机号" id="input-phone-1" style="margin-left: 4%;"><br>
        <input type="text" placeholder="输入验证码" id="input-phone-2" style="margin-left: 4%;">
				<button v-show="showtime" id="btn-phone-1" @click="getyzm()" style="background-color: #7aa4f5;">获取验证</button>
        <button v-show="!showtime" id="btn-phone-1" style="background-color: #cccccc;"  disabled>{{count}}s</button><br>
        
				<input type="password" placeholder="请输入新密码" id="input-phone-3" style="margin-left: 4%;"><br>
    </div>
    <div style="text-align:center" id="submit_1">
        <button button id="btn-phone-2" @click="complete()">完成</button>
    </div>
</div>
</template>
<script>

import { Flexbox, FlexboxItem } from 'vux'
import { Divider,	XHeader, } from 'vux'
import { Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'

export default {
    name: 'Registe' ,
    components: {
	XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    Flexbox,
    FlexboxItem,
    Divider
    },
		data() {
			return {
				showtime:true,
				count:'',
				timer:null,
			}
			},
    methods: {
        getyzm:function(){
					const TIME_COUNT=60;
					if(!this.timer){
						this.count=TIME_COUNT;
						this.showtime=false;
						this.timer=setInterval(()=>{
							if(this.count>0&&this.count<=TIME_COUNT){
								this.count--;
							}else{
								this.showtime=true;
								clearInterval(this.timer);
								this.timer=null
							}
						},1000)
					}
            var phone = document.getElementById("input-phone-1").value;
            var UrL = this.yuming + '/submail' + "?phone=" + phone;
            this.axios({
                method: "GET",
                url: UrL,
                data:JSON.stringify({
                    phone: phone
                })
            }).then(res =>{
               // alert('发送成功');
                console.log(res.data);
            }).catch(error =>{
               // alert('发送失败');
            });
        },
        complete:function(){
            var phone = document.getElementById("input-phone-1").value;
            var yzminput = document.getElementById("input-phone-2").value;
            var pwd = document.getElementById("input-phone-3").value;
            var UrL = this.yuming + '/pwd/forget' ;
            this.axios({
                method: "POST",
                url: UrL,
                data:{
                    phoneNumber: phone,
                    code: yzminput,
                    newPwd: pwd
                }
            }).then(res =>{
                //alert('修改成功');
								this.$router.push({path: '/login'})
            }).catch(error =>{
               // alert('修改失败');
            });
        }
    }
   
}
</script>
<style>
html,body{
    margin: 0;             
    padding: 0;
    width: 100%;
    height: 100%;
}
body{
    background-color: rgb(240, 240, 240);
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


#input-phone-1 {
    width: 80%;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; 
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}
#input-phone-2 {
    width: 40%;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; 
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}
#btn-phone-1 {
    width:36%; text-align: center; line-height: 25px;margin:0 0 13px 2%; height:48px; color:#fff; font-size:10px;
    border-style: none;
    outline: none; 
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}
#input-phone-3 {
    width: 80%;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; 
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}
#submit_1 {
    margin-top: 50%;
}

#btn-phone-2 {
    width:88%; text-align: center; line-height: 25px;margin:0 auto 15px; height:48px; color:#fff; font-size:20px; background-color:#7aa4f5 ;
    border-style: none;
    outline: none; 
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}
</style>


