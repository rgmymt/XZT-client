<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">我的课程</span>
        </x-header>
        <div id="myclass_div">
            <div id="button_tab">
                <button style="margin-right:10%;" @click="changeF()">委培课程</button>
                <button @click="changeF()">网络课程</button>
            </div>
            <div v-if = flag>
                <div v-for="(valuex,keyx) in valuesx" :key="keyx" class="wpclass">
                    <h5 v-html = valuex.title></h5>
                    <p v-html = valuex.companyName></p>
                    <p v-html = valuex.place></p>
                    <textarea v-html = valuex.content></textarea>
                </div>
            </div>
            <div v-if = !flag>
                <div v-for="(value,key) in values" :key="key" class="netclass">
                    <img class="classcover" v-bind:src= "yuming.substr(0,yuming.length-5)+value.cover.substr(1)"><br>
                    <h5 v-html = value.title></h5>
                    <p v-html = value.teacher></p>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import {
    XHeader,
} from 'vux'
import del_1 from '../../assets/icon/delete.png'

export default {
    components: {
        XHeader
    },
    data() {
        return {
           flag: true,
           values:[],
           valuesx:[]
        }        
    },
    methods: {
        begindo:function(){
            var Url = this.yuming + '/msg/MyClass' + '?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization');
            this.axios({
                method: 'GET' ,
                url: Url ,
                data:JSON.stringify({
                loginId : localStorage.getItem('loginid')
                })
            }).then(res =>{
                console.log(res.data);
                console.log(res.data.trains.info);
                this.valuesx = res.data.trains.info;
                console.log(this.valuesx);
                this.values = res.data.courses.info;
            }).catch(error => {
            console.log('Error');
            });
        },
        changeF: function(){
            this.flag = !this.flag
        }
    },
    mounted:function(){
        this.begindo();
	}
}
</script>

<style>
@import '../../style/buttons.css';

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

#myclass_div {
    height: 80%;
}

#button_tab{
    text-align: center;
    height: 10%;
}

#button_tab button{
    margin-top: 2%;
    height: 70%;
    width: 40%;
    border-radius: 8px;
    background-color: #FFFFFF;
    border: 1px solid rgb(229, 229, 229);
    box-shadow:0px 6px 0px  rgb(229, 229, 229);
}

#button_tab button:active{
    transform: translateY(2px);
    box-shadow:0px 4px 0px  rgb(229, 229, 229);
}

.classcover{
    width: 7em;
    height: 7em;
}

.wpclass {
    margin: 1em 14% 1em 6%;
    height: 12em;
    width: 80%;
    border-radius: 8px;
    border: 1px solid rgb(229, 229, 229);
    padding-left: 5%;
}

.wpclass textarea{
    border: none;
    width: 80%;
}

.netclass {
    margin: 1em 14% 1em 6%;
    height: 12em;
    width: 80%;
    border-radius: 8px;
    border: 1px solid rgb(229, 229, 229);
    padding-left: 5%;
}

.netclass h5,p{
    margin: 0px;

}

</style>
