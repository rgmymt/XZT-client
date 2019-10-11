<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">课程推荐</span>
        </x-header>
        <!-- <div class="search" >
            <x-input title="搜索" type="text" placeholder="  输入关键字" class="searchBox" v-model="searchVal" style="background-color:#FFFFFF;">
            <i class="iconfont icon-sousuo" slot="label" style="font-size: 24px;color: #CCCCCC;margin-right: 10px;padding-right:10px;display:block;" width="24" height="24"></i>
            </x-input>
        </div> -->
        <tab  :line-width="1" custom-bar-width="60px">
            <tab-item @on-item-click="changeQ" selected>汽车修理工</tab-item>
            <tab-item @on-item-click="changej">机修钳工</tab-item>
            <tab-item @on-item-click="changeS">数控车工</tab-item>
            <tab-item @on-item-click="changeC">车工</tab-item>
			<tab-item @on-item-click="changeH" >焊工</tab-item>
			<tab-item @on-item-click="changeZ">装配钳工</tab-item>
			<tab-item @on-item-click="changeL">冷作钣金工</tab-item>
			<tab-item @on-item-click="changeY">茶艺师</tab-item>
        </tab>
		<scroller lock-x height="-105" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="company_label" v-for="(value,key) in object" :key="key" v-on:click="cR2cR_D(value.groupID)">
            <div class="company_img">
                <img class="c_img" v-bind:src= "yuming.substr(0,yuming.length-5)+value.cover.substr(1)">
            </div>
            <div class="company_information">
                <div style="margin-top:10px;font-size: 18px;" v-html= "value.title"></div>
                <span style="color:red;font-size: 14px;">评分:</span><p class="noblock" v-html= "value.grades"></p><br>
                <span style="color:red;font-size: 14px;">价格:</span><p class="noblock" v-html= "'￥'+value.price"></p><br>
                <span style="color:rgb(165, 165, 165); font-size:8px">已有</span><p class="noblock" style="color:rgb(165, 165, 165); font-size:8px" v-html= "value.views"></p>
                <span style="color:rgb(165, 165, 165); font-size:8px">人看过</span><br>
            </div>
        </div>
		</scroller>

	</div>
</template>

<script>
import {
    XHeader,
    XInput,
    Group,
    Tab, 
	Scroller,
    TabItem
} from 'vux'
import c_img1 from '../../assets/img/c_img.jpg'




export default {
    components: {
        XHeader,
        XInput,
        Group,
        Tab,
		 Scroller,
        TabItem
    },
    data() {
        return {
            searchVal: '', //默认输入为空
			bottomCount:6,
            type : '汽车修理工',
            numvalue:'',
            object:[]
            }
    },
	watch:{
	
		bottomCount(newCount,oldCount){
			this.begindo();
		},
	},
    methods: {
		onScrollBottom() {
			if (this.onFetching) {
				// do nothing
			} else {
				this.onFetching = true
				setTimeout(() => {
					this.bottomCount += 3
					this.$nextTick(() => {
						this.$refs.scrollerBottom.reset()
					})
					this.onFetching = false
				}, 2000)
			}
		},
        changeQ(){
            this.type = "汽车修理工";
            this.begindo();
        },        
        changej(){
            this.type = "机修钳工";
            this.begindo();
        },        
        changeS(){
            this.type = "数控车工";
            this.begindo();
        },        
        changeC(){
            this.type = "车工";
            this.begindo();
        },
		changeH(){
			this.type = "焊工";
			this.begindo();
		},
		changeZ(){
			this.type = "钳工";
			this.begindo();
		},
		changeL(){
			this.type = "冷作钣金工";
			this.begindo();
		},
		changeY(){
			this.type = "茶艺师";
			this.begindo();
		},
        begindo(){
            console.log(this.type);
            var UrL = this.yuming + '/list/video' +'?type='+ this.type +'&number='+ this.bottomCount +'&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization');
            this.axios({
                methods: 'GET' ,
                url: UrL,
                data:JSON.stringify({
                    type : this.type,
                    number : this.bottomCount
                })
            }).then(res =>{
            console.log(res.data.data.info);
            this.object = res.data.data.info;
            }).catch(error => {
            console.log('sad');
            });
        },
        cR2cR_D: function(group_id){
            this.$router.push({
                path: '/courseRe/courseDetails',
                query: {
                    g_id: group_id
                }
            });
        },
    },
    created(){
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
.search .searchBox{
    padding: 0px !important;
    margin: 10px 15px !important;
    border-radius: 10px;
    border: 1px solid #7AB9F6;
}



#cRselect {
    margin:0.5em auto; 
    padding-left:60%;
}

#cRselect .el-select {
    width: 100%;
}

.company_label {
    height: 7em;
    width: 100%;

  margin-top: 10px;
  
  
   

}

.noblock {
    display: inline;
	font-size: 14px;
}

.company_information {
    width: 55%;
	margin-left: 10px;
    float: left;
    height: 100%;
}

.company_information p {
    margin: 10px auto;
}

.company_img {
    width: 35%;
    float: left; 
    height: 100%; 
    padding-left: 5%;

}

.c_img {
    width: 100%;
    height: 6em;
    margin-top:0.5em;
    border-radius: 8px;
}
</style>
