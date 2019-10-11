<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">文章</span>
        </x-header>
        <div id ="article">
            <div id="head">
                <h3>国务院总理李克强等与中外记者见面</h3>
                <p>2018-03-20 11:24:18 &nbsp;&nbsp;&nbsp;&nbsp;来源： 新华网</p>
            </div>
            <div id="body">
                <img v-bind:src = "img_1">
                <textarea id="t_1">&nbsp;&nbsp;中国40年来有目共睹的经济社会发展成就和开放是密不可分的。开放推动了改革，促进了发展。可以说中国人民从开放当中得到了甜头。去年年初，习近平主席在达沃斯经济论坛发表演讲时明确表示，中国将继续维护自由贸易，开放是中国的基本国策。如果说中国的开放有新变化的话，那就是门会越开越大，中国经济已经深度地融入了世界经济，关上门等于挡住了我们自己的路。</textarea>
                <img v-bind:src = "img_2">
                <textarea id="t_1">&nbsp;&nbsp;我们的外商投资负面清单制度会进一步进行调整缩减。今年及今后几年会逐步放宽准入。而且我们还要加快推进涉及外商投资的三个法律合并成一个基础性法律，以实现准入前国民待遇的承诺。这次全国人民代表大会已经批准了宪法修正案和政府机构改革方案，我们会遵循宪法，推进机构改革，这将更有利于坚持我们对外开放的基本国策。</textarea>
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
            img_2: img_2
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
