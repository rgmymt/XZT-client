<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">消息</span>
        </x-header>
        <div class="various_message" id="M_type1" @click="clickM1()">
            <p>招聘消息</p>
        </div>
        <div class="various_message" id="M_type2" @click="clickM2()">
            <p>考试消息</p>
        </div>
        <div class="various_message" id="M_type3" @click="clickM3()">
            <p>课程消息</p>
        </div>
        <div class="various_message" id="M_type4" @click="clickM4()">
            <p>其他消息</p>
        </div>
        <div class="message_content" v-show="seen" v-for="(value,key) in values" :key="key">
            <h5 v-html= value.nickname></h5>
            <p v-html= value.senderID></p>
            <p v-html= value.time></p>
            <textarea v-html= value.content></textarea>
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
            seen: false,
            values:[]
            }        
    },
    methods: {
        cR2cR_D(){
            this.$router.push('/courseRe/courseDetails')
        }, 
        doit(type){
            this.seen = true ;
            console.log(this.seen)
            var Url = this.yuming + '/message/list?type='+type+'&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization')+'&number=5';
            this.axios({
                method: "GET" ,
                url: Url ,
                data:JSON.stringify({
                    token: localStorage.getItem('Authorization'),
                    loginId: localStorage.getItem('loginid'),
                    type: type,
                    number: 5
                })
            }).then(res =>{
                this.values = res.data.data.info;
            }).catch(error =>{
                alert('失败');
            });
        },
        clickM1:function(){
            this.doit("招聘");          
        },
        clickM2:function(){
            this.doit("考试");          
        },
        clickM3:function(){
            this.doit("课程");          
        },
        clickM4:function(){
            this.doit("其他");          
        },
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

.various_message {
    text-align: center;
    border: 1px rgb(229, 229, 229) solid;
    height: 9%;
    position: relative;
}

.message_content{
    border: 1px rgb(229, 229, 229) solid;
    height: 15%;
    position: relative;
}

.message_content h5,p{
    margin: 0px;
}

.message_content textarea{
    border: none;
}


</style>
