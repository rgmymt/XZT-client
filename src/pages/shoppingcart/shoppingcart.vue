<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">购物车</span>
        </x-header>
        <div class="shopping_content" v-for="(value,key) in object" :key="key">
            <input type="checkbox" class="shoppingCheck">
            <div class="classname">
                <p v-html=value.shoppingname></p>
            </div>
            <p class="shoppingmoney" v-html=value.shoppingcost></p>
        </div>
        <div class="down_div">
            <input type="checkbox" id="allCheck"><label for="allCheck">全选</label>
            <div style="text-align:center;padding-top:20px;">
                <p>合计:{{allcost}}</p>
                <button id="duoshou" v-on:click="sc_tttp">去结算</button>
            </div>
        </div>
	</div>
</template>

<script>
import {
    XHeader,
} from 'vux'
import c_img1 from '../../assets/img/c_img.jpg'

export default {
    components: {
        XHeader
    },
    data() {
        return {
            object: [{
                shoppingname: '课程一',
                shoppingcost: '费用：\xa0' + '1000' + "元"
                },{
                shoppingname: '课程二',
                shoppingcost: '费用：\xa0' + '3000' + "元"
                }],
                allcost : "4000" + "元"
            }        
    },
    methods: {
        sc_tttp(){
            this.$router.push('/courseRe/courseDetails/shoppingcart/tttp')
        }, 
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

.shopping_content{
    height: 5em;
    margin: 0.5em auto;
    text-align: center;
    border-bottom: 1px rgb(229, 229, 229) solid;
}

.shoppingCheck{
    float: left;
    margin-top:1.5em;
}

.classname{
    display: inline;
}
.classname p{
    display: inline;
}

.shoppingmoney{
    text-align:right;
    font-size: 5px;
    margin-top: 3em;
}

.down_div {
    border-top: 1px #7AB9F6 solid;
    height: 12%;
    width: 100%;
    position:absolute;
    bottom:0;
}

.down_div p{
    display: inline;
    text-align: center;
    padding-left: 6em;
}

#allCheck{
    float: left;
    margin-top:2.5em;
}

.down_div label{
    float: left;
    margin-top:1.7em;
}


#duoshou{
  background-color: #7AB9F6;
  height: 3em;
  border-style: none;
  border-radius: 5px;
  color: #FFFFFF;
}

#duoshou:active{
  transform: translateY(1px);
  background-color: rgb(108, 162, 216);
}
</style>
