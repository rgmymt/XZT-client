<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">定向委培</span>
        </x-header>
        <div class="search" >
            <x-input title="搜索" type="text" placeholder="  输入关键字" class="searchBox" v-model="searchVal" style="background-color:#FFFFFF;">
            <i class="iconfont icon-sousuo" slot="label" style="font-size: 24px;color: #CCCCCC;margin-right: 10px;padding-right:10px;display:block;" width="24" height="24" @click="dosearch()"></i>
            </x-input>
        </div>
        <div class="drt" style="padding-left:6%; margin-bottom:1em;">
            <el-cascader
                :options="options"
                v-model="selectedOptions"
                placeholder="区域"
								:show-all-levels="false"  
								 change-on-select
                @change="handleChange">
            </el-cascader>
           
            <el-select v-model="sortvalue" clearable placeholder="排序" @change="selectsort">
                <el-option
                v-for="items in sortlist"
                :key="items.label"
                :label="items.label"
                :value="items.value"
                >
                </el-option>
            </el-select>
						<el-select v-model="numvalue" clearable placeholder="数量" @change="selectStages">
								<el-option
								v-for="item in numlist"
								:key="item.value"
								:label="item.label"
								:value="item.value"
								>
								</el-option>
						</el-select>
        </div>
        <div class="positionlist" v-for="(value,key) in object" :key="key" v-on:click="DT2DT_C(value.id)">
           	<flexbox>
           						<flexbox-item :span="1/3">
           							<div class="positioncell-demo">
           							
           								<img v-if="value.cover!=null" style="width: 100%;" :src="yuming.substr(0,yuming.length-5)+value.cover.substr(1)"></img>
           							</div>
           						</flexbox-item>
           						<flexbox-item :span="2/3">
           							<div class="positioncell-demo">
           								<span class="positiontitle">{{value.companyName}}</span>
           								<br>
													<span style="font-size: 13px;">学费:</span>
													<span class="positionsarly">{{value.tuitionCurrent}}元</span>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													<span style="font-size: 13px;">薪水:</span>
           								<span class="positionsarly">{{value.salary}}元/月</span><br>
           								<span class="positiondeadline" >{{'培训内容：'+value.career}}</span>     
													<br>
           								<span class="positionplace"  >{{value.province+value.city+value.area}}</span>
           							</div>
           						</flexbox-item>
           					</flexbox>
					 <!-- <div id="company_information">
                <h4 v-html= value.companyName></h4>
                <p v-html= value.tuitionCurrent></p>
                <p v-html= value.salary></p>
                <p class="sm_p" v-html= value.postTime></p>
                <p class="sm_p" v-html= value.deadline></p>
            </div>
            <div id="company_img">
                <img id="c_img" v-bind:src= "yuming.substr(0,yuming.length-5)+value.cover.substr(1)">
            </div> -->
        </div>
	</div>
</template>

<script>
import {
    XHeader,
    Flexbox,
    FlexboxItem,
    XInput,
    Group,
} from 'vux'
import c_img1 from '../../assets/img/c_img.jpg'

var xsnum = 2;
var p = ["","",""] ;
var sort = 0;

export default {
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        XInput,
        Group,
    },
    data() {
        return {
            searchVal: '', //默认输入为空
            options: [{
                value: '浙江省' ,
                label: '浙江省' ,
                children:[{
                    value: '杭州市',
                    label: '杭州市',
                    children: [{
                        value: '江干区',
                        label: '江干区'
                    }, {
                        value: '上城区',
                        label: '上城区'
                    }, {
                        value: '滨江区',
                        label: '滨江区'
                    }, {
                        value: '萧山区',
                        label: '萧山区'
                    },{
                        value: '余杭区',
                        label: '余杭区'
                    },{
                        value: '临安区',
                        label: '临安区'
                    },{
                        value: '拱墅区',
                        label: '拱墅区'
                    }]
                }, {
                    value: '宁波市',
                    label: '宁波市',
                    children: [{
                        value: '镇海区',
                        label: '镇海区'
                    },{
                        value: '北仑区',
                        label: '北仑区'
                    },{
                        value: '海曙区',
                        label: '海曙区'
                    },{
                        value: '鄞州区',
                        label: '鄞州区'
                    }, {
                        value: '江北区',
                        label: '江北区'
                    }]
                }, {
                    value: '金华市',
                    label: '金华市',
                    children: [{
                        value: '金东区',
                        label: '金东区'
                    },{
                        value: '浦江县',
                        label: '浦江县'
                    },{
                        value: '义乌市',
                        label: '义乌市'
                    },{
                        value: '东阳市',
                        label: '东阳市'
                    }, {
                        value: '婺城区',
                        label: '婺城区'
                    }]
                }]
            },{
                value: '江苏省',
                label: '江苏省',
                children: [{
                    value: '南京市',
                    label: '南京市',
                    children: [{
                        value: '玄武区',
                        label: '玄武区'
                    }, {
                        value: '秦淮区',
                        label: '秦淮区'
                    }, {
                        value: '建邺区',
                        label: '建邺区'
                    }, {
                        value: '鼓楼区',
                        label: '鼓楼区'
                    }, {
                        value: '浦口区',
                        label: '浦口区'
                    }]
                }, {
                    value: '无锡市',
                    label: '无锡市',
                    children: [{
                        value: '锡山区',
                        label: '锡山区'
                    }, {
                        value: '惠山区',
                        label: '惠山区'
                    }, {
                        value: '滨湖区',
                        label: '滨湖区'
                    }, {
                        value: '梁溪区',
                        label: '梁溪区'
                    }, {
                        value: '宜兴区',
                        label: '宜兴区'
                    }]
                }]
            },{
                value: '广东省',
                label: '广东省',
                children: [{
                    value: '广州市',
                    label: '广州市',
                    children: [{
                        value: '海珠区',
                        label: '海珠区'
                    }, {
                        value: '天河区',
                        label: '天河区'
                    }, {
                        value: '黄浦区',
                        label: '黄浦区'
                    }, {
                        value: '白云区',
                        label: '白云区'
                    }, {
                        value: '荔湾区',
                        label: '荔湾区'
                    }]
                }, {
                    value: '深圳市',
                    label: '深圳市',
                    children: [{
                        value: '福田区',
                        label: '福田区'
                    }, {
                        value: '南山区',
                        label: '南山区'
                    }, {
                        value: '罗湖区',
                        label: '罗湖区'
                    }, {
                        value: '盐田区',
                        label: '盐田区'
                    }, {
                        value: '宝安区',
                        label: '宝安区'
                    }]
                }]
            }],
            numlist: [{
                value: 2,
                label: "显示两个"
            },{
                value: 5,
                label: "显示五个"
            },{
                value: 10,
                label: "显示十个"
            }],
            sortlist:[{
                value: 0,
                label: "最新发布"
            },{
                value: 2,
                label: "距离最近"
            },{
                value: 4,
                label: "学费最低"
            },{
                value: 5,
                label: "学费最高"
            },{
                value: 6,
                label: "薪水最高"
            },{
                value: 8,
                label: "最近截止"
            }],
            numvalue: '',
            sortvalue: '',
            selectedOptions: [],
            object: [],
        }
    },
    methods: {
        DT2DT_C(id){
            this.$router.push({
                path: '/DirectionalT/DirectionalT_course' ,
                query: {
                    D_id : id 
                }
            });
        },
        handleChange(value) {
            p = value;
            console.log(p);
            this.begindo(xsnum,p,sort);
        },
        selectStages: function(value){
            xsnum = value;
            console.log(xsnum);
            this.begindo(xsnum,p,sort);
        },
        selectsort: function(value){
            sort = value;
            console.log(sort);
            this.begindo(xsnum,p,sort);
        },
        begindo: function(xsnum,p,sort){
            console.log(xsnum);
            console.log(p[2]);
            console.log(sort);
						if(p[2]==undefined)
						p[2]='';
						if(p[1]==undefined)
						p[1]='';
            var Url = this.yuming + '/msg/commissionedTrain/list?number='+xsnum+ '&sort=' + sort + '&longitude=30.3115975656&latitude=120.3906297684&career=钳工&discount=1';
            Url += '&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization')+'&province='+p[0]+'&city='+p[1]+'&area='+p[2];
            this.axios({
                method: "GET" ,
                url: Url ,
                data:JSON.stringify({
                    number: xsnum,
                    sort: sort,
                    longitude: 30.3115975656,
                    latitude: 120.3906297684,
                    career: "钳工",
                    discount: 0,
                    token: localStorage.getItem('Authorization'),
                    loginId: localStorage.getItem('loginid'),
                    province: p[0],
                    city: p[1],
                    area: p[2]
                })
            }).then(res =>{
                console.log(res.data.data.info);
                this.object = res.data.data.info;
            }).catch(error =>{
							this.object=[];

                console.log('ER');
            });
        },
        begindo1: function(){
            console.log(xsnum);
            console.log(p[0]);
            console.log(sort);
          var Url = this.yuming + '/msg/commissionedTrain/list?number='+xsnum+ '&sort=' + sort + '&longitude=30.3115975656&latitude=120.3906297684&career=钳工&discount=1';
          Url += '&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization')+'&province&city&area';
           this.axios({
                method: "GET" ,
                url: Url ,
                data:JSON.stringify({
                    number: xsnum,
                    sort: sort,
                    longitude: 30.3115975656,
                    latitude: 120.3906297684,
                    career: "钳工",
                    discount: 0,
                    token: localStorage.getItem('Authorization'),
                    loginId: localStorage.getItem('loginid'),
                    province: p[0],
                    city: p[1],
                    area: p[2]
                })
            }).then(res =>{
                this.object = res.data.data.info;
            }).catch(error =>{
                alert('请重新选择');
            });
        },
        dosearch:function(){
            console.log(this.searchVal);
            console.log(xsnum);
            var Url = this.yuming + '/msg/commissionedTrain/list/search?search=' + this.searchVal + '&number=' + xsnum + '&longitude=30.3115975656&latitude=120.3906297684';
            Url += '&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization');
            this.axios({
                method: 'GET' ,
                url: Url ,
                data:JSON.stringify({
                    search: this.searchVal,
                    longitude: 30.3115975656,
                    latitude: 120.3906297684,
                    number: xsnum,
                    token: localStorage.getItem('Authorization'),
                    loginId: localStorage.getItem('loginid')
                })
            }).then(res =>{
                this.object = res.data.data.info;
            }).catch(error =>{
                 alert('请重新选择');   
            });
        }
    },
		created(){
			  this.begindo1();
		},
    mounted:function(){
      
				var body=document.getElementById('bg')
				body.style.height=`${document.documentElement.clientHeight}`+'px'
				body.style.backgroundColor="#FFFFFF"
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
.drt .el-input__inner{
	border: 0px !important;
}
.search .searchBox{
    padding: 0px !important;
    margin: 10px 15px !important;
    border-radius: 10px;
    border: 1px solid #7AB9F6;
}

.el-cascader {
    width: 30%;
}
.el-cascader-menu{
		height: auto;
		min-width: 30%;
	}
.el-select {
    width: 30%;
}

.positionimg {
		width: 100%;
		height: 60px;

	}

	.positionlist {
		margin-top: 5px;
	}

	.positionlist .vux-flexbox {
		width: 94% !important;
		margin-left: 3%;
		margin-right: 3%;
	}

	.positiondeadline {
		font-size: 10px;
		color: #ABABAB;
	}

	.positionsarly {
		color: #EE0000;
		font-size: 12px;

	}

	.positiontitle {
		font-size: 18px;
		color: #000000;
	}

	.positioncell-demo {
		line-height: 20px;
	}

	.positionplace {
		color: #ABABAB;
		font-size: 11px;
		line-height: 16px;
	
	}

#company_information {
    width: 55%;
    float: left;
    height: 100%;
    padding-left: 7%;
}

#company_information h4 {
    margin: 1.5em auto;
}

.sm_p{
    font-size: 10px;
}

#company_information p {
    margin: 0.3em auto;
}

#company_img {
    width: 30%;
    float: left; 
    height: 100%; 

}

#c_img {
    width: 5em;
    height: 5em;
    margin-top:1em;
}
</style>
