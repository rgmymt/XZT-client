<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}" style="position: fixed;width: 100%;top:0px">
            <span style="margin-top:5px;font-size:17px;">文章</span>
        </x-header>
        <div id ="article" style="margin-top: 50px;">
            <div id="head">
                <h3>新职通使用条例</h3>
            </div>
            <div id="body">
                <h4>第一章　总　则</h4>
                <p>第一条 为了规范电信市场秩序，维护电信用户和电信业务经营者的合法权益，保障电信网络和信息的安全，促进电信业的健康发展，制定本条例。</p>
                <p>第二条 在中华人民共和国境内从事电信活动或者与电信有关的活动，必须遵守本条例。</p>
                <p>本条例所称电信，是指利用有线、无线的电磁系统或者光电系统，传送、发射或者接收语音、文字、数据、图像以及其他任何形式信息的活动。</p>
                <p>第三条 国务院信息产业主管部门依照本条例的规定对全国电信业实施监督管理。</p>
                <p>省、自治区、直辖市电信管理机构在国务院信息产业主管部门的领导下，依照本条例的规定对本行政区域内的电信业实施监督管理。</p>
                <p>第四条 电信监督管理遵循政企分开、破除垄断、鼓励竞争、促进发展和公开、公平、公正的原则。</p>
                <p>电信业务经营者应当依法经营，遵守商业道德，接受依法实施的监督检查。</p>
                <p>第五条 电信业务经营者应当为电信用户提供迅速、准确、安全、方便和价格合理的电信服务。</p>
                <h4>第二章　市 场</h4>
                <p>第一条 为了规范电信市场秩序，维护电信用户和电信业务经营者的合法权益，保障电信网络和信息的安全，促进电信业的健康发展，制定本条例。</p>
                <p>第二条 在中华人民共和国境内从事电信活动或者与电信有关的活动，必须遵守本条例。</p>
                <p>本条例所称电信，是指利用有线、无线的电磁系统或者光电系统，传送、发射或者接收语音、文字、数据、图像以及其他任何形式信息的活动。</p>
                <p>第三条 国务院信息产业主管部门依照本条例的规定对全国电信业实施监督管理。</p>
                <p>省、自治区、直辖市电信管理机构在国务院信息产业主管部门的领导下，依照本条例的规定对本行政区域内的电信业实施监督管理。</p>
                <p>第四条 电信监督管理遵循政企分开、破除垄断、鼓励竞争、促进发展和公开、公平、公正的原则。</p>
                <p>电信业务经营者应当依法经营，遵守商业道德，接受依法实施的监督检查。</p>
                <p>第五条 电信业务经营者应当为电信用户提供迅速、准确、安全、方便和价格合理的电信服务。</p>
            </div>
        </div>
	</div>
</template>

<script>
import {
    XHeader,
    XInput,
    Group,
    Tab, 
    TabItem
} from 'vux'

import img_1 from '../../assets/img/img_1.jpg'
import img_2 from '../../assets/img/img_2.jpg'



export default {
    components: {
        XHeader,
        XInput,
        Group,
        Tab, 
        TabItem
    },
    data() {
        return {
            img_1: img_1,
            img_2: img_2,
            Tiao: ""
            }
    },
    methods: {
        
    },
    mounted:function(){
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

#head {
    text-align: center;
}

#head h3{
    font-size: 21px;
}
#head p{
    color: rgb(165, 165, 165);
    font-size: 12px;
}

#body {
    text-align: center;
}

#body img{
    height: 12em;
    width: 18em;
}

#body #t_1{
    width: 80%;
    border: none;
    height: 12em;
    margin-top:1em;
}

</style>
