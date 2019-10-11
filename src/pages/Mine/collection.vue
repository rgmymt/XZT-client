<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">收藏</span>
        </x-header>
        <select id="vnSelect" style="border:none;" @change="selectStages()">
            <option disabled="disabled">选择显示的个数</option>
            <option value ="2">2个</option>
            <option value ="5">5个</option>
            <option value="10">10个</option>
        </select>
        <div id="collection_label" v-for="(value,key) in object" :key="key" v-on:click="cR2cR_D(value.jobFairID)">
            <h4>招聘会消息</h4>
            <h3 v-html = "value.title"></h3>
            <p v-html = "value.launchingTime"></p>
            <p v-html = "value.launchingPlace"></p>
        </div>
	</div>
</template>

<script>
import {
    XHeader
} from 'vux'
import c_img1 from '../../assets/img/c_img.jpg'

export default {
    components: {
        XHeader
    },
    data() {
        return {
            searchVal: '', //默认输入为空
            object: []
            }
    }, 
    methods: {
        cR2cR_D(id){
			this.$router.push({path:'/employdetil',query:{employid:id}})
        },
        selectStages: function(){
            this.begindo();
        },
        begindo(){
            var cindex = document.getElementById("vnSelect").selectedIndex;
            var cnum = document.getElementById("vnSelect").options[cindex].value;
            console.log(cnum);
            var UrL = this.yuming + '/msg/myCollection' +'?number='+ cnum +'&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization');
            this.axios({
                methods: 'GET' ,
                url: UrL,
                data:JSON.stringify({
                    loginId : localStorage.getItem('loginid'),
                    number : cnum
                })
            }).then(res =>{
		
            console.log(res.data.data.list);
            this.object = res.data.data.list;
            }).catch(error => {
            console.log('sad');
            });
        }
    },
    mounted:function(){
        this.begindo();
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

#collection_label {
    margin: 1em 14% 1em 6%;
    height: 10em;
    width: 80%;
    border-radius: 8px;
    border: 1px solid rgb(229, 229, 229);
    padding-left: 5%;
    box-shadow:4px 4px 4px  rgb(229, 229, 229);
}

#collection_label h3{
    margin: 1em auto 1.5em auto;
    color: #7AB9F6;
}

#collection_label p{
    margin: 0em auto 0em auto;
    font-size: 12px;
}


</style>
