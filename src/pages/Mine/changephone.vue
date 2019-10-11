<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">修改手机号</span>
        </x-header>
        <div id="changephone_div">
            <p v-html= nowphone></p>
            <p style="margin-bottom:0.2em;">新的手机号：</p>
            <input type="text" class="phone_input"><br>
            <input type="text" class="CAPTCHA_input" placeholder="短信验证码"><button class="blue_btn1">获取验证</button>
        </div>
        <div style="text-align:center;">
        <button class="blue_btn">确认</button>
        </div>
	</div>
</template>

<script>
import {
    XHeader,
} from 'vux'

export default {
    components: {
        XHeader
    },
    data() {
        return {
                nowphone: "当前手机号：" + "18976548320"
            }        
    },
    methods: {
    }
}
</script>

<style>

html,body {
  margin: 0;             
  padding: 0;
  width: 100%;
  height: 100%;
}

#bg {
  margin: 0;             
  padding: 0;
  width: 100%;
  height: 100%;
}

.vux-header {
    background-color: #7AB9F6 !important;
    height: 45px;
    text-align: center;
    line-height: 60px;
    color: #FFFFFF;
    width: 100%;
}

#changephone_div {
    margin-bottom: 7%;
}

#changephone_div p{
    margin-left: 7%;
}

.phone_input{
    margin:auto auto 2em 10%;
    width: 80%;
    border: 1px rgb(229, 229, 229) solid;
    height: 1.5em;
    font-size: 1em;
}

.CAPTCHA_input{
    margin-left: 10%;
    width: 50%;
    border: 1px rgb(229, 229, 229) solid;
    height: 1.5em;
    font-size: 1em;
}

.blue_btn1 {
  background-color: #7AB9F6;
  height: 2.1em;
  width: 20%;
  border-style: none;
  border-radius: 5px;
  font-size: 0.8em;
  color: #FFFFFF;
  margin-left: 10%;
}

.blue_btn1 :active{
  transform: translateY(1px);
  background-color: rgb(108, 162, 216);
}

.blue_btn {
  margin-top: 10%;
  background-color: #7AB9F6;
  height: 3.5em;
  width: 8em;
  border-style: none;
  border-radius: 5px;
  color: #FFFFFF;
}

.blue_btn :active{
  transform: translateY(1px);
  background-color: rgb(108, 162, 216);
}


</style>