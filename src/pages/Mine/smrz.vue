<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}" style="position: fixed;top:0px;z-index: 2;">
            <span style="margin-top:5px;font-size:17px;">实名认证</span>
        </x-header>
        
        <div id="smrz_div">
            <div class="box">
                <input type="text" class="smrz_input1" id="realname" placeholder="真实姓名"/>
            </div> 
            <div class="box">
                <input type="text" class="smrz_input2" id="IDcardNum" placeholder="身份证号"/>
            </div>
            <div id="idcardface">
            </div>
            <div id="idcardback">
            </div>      
        </div>
        <div style="text-align:center;">
        <button class="blue_btn" @click="submit()">提交</button>
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
            }        
    },
    methods: {
        submit:function(){
            
        }
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

#smrz_div {
    text-align: center;
		padding-top: 80px;
}

.box {
    position: relative;
}


.box .smrz_input1 {
    width: 200px;
    height: 30px;
    border-radius: 15px;
    margin: 10px 0;
    background: url(../../assets/img/people.png) no-repeat;
    background-color: white;
    background-position: 3px;
    padding-left: 30px;
    border: 1px solid black;
    outline: none;
}

.box .smrz_input2 {
    width: 200px;
    height: 30px;
    border-radius: 15px;
    margin: 10px 0;
    background: url(../../assets/img/idcard.png) no-repeat;
    background-color: white;
    background-position: 3px;
    padding-left: 30px;
    border: 1px solid black;
    outline: none;
}

#idcardface {
    height: 9.5em;
    width: 70%;
    margin-left: 15%;
    background-image: url(../../assets/img/face.png);
    background-size: 100% 100%;
    margin-bottom: 1em;
}

#idcardback {
    height: 9.5em;
    width: 70%;
    margin-left: 15%;
    background-image: url(../../assets/img/back.png);
    background-size: 100% 100%;
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
