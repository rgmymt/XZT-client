<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">反馈</span>
        </x-header>
        <div id="brush_div">
            <h3>问题反馈:</h3>
            <textarea id="brush_text"></textarea>       
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
            var str = document.getElementById("brush_text").value;
            var UrL = this.yuming + '/feedback' + '&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization');
            console.log(str);
            this.axios({
                method: "POST",
                url: UrL,
                data:JSON.stringify({
                    loginId: localStorage.getItem('loginid'),
                    content: str
                })
            }).then(res =>{
                alert('提交成功');
            }).catch(error =>{
                alert('提交失败');
            });
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

#brush_div {
    height: 50%;
}

#brush_div h3{
    margin-bottom: 0.5em;
    margin-left: 7%;
}

#brush_text {
    height: 90%;
    width: 80%;
    margin-left: 10%;
    border: 2px rgb(229, 229, 229) solid;
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
