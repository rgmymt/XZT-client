<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">确认购买</span>
        </x-header>
        <div id="goodsinformation">
            <h4 style="margin:4% auto 0 7%;">商品信息</h4>
            <div class="goods_content" v-for="(value,key) in object" :key="key">
                <p v-html= value.clasSName></p>
            </div>
        </div>
        <div id="jisuan">
            <br>
            <div class="text clearfix" style="text-align:center;">
                <span style="float:left;margin-left:1em;">商品金额</span><span style="float:right;margin-right:1em;">2100</span>
            </div><br><br>
            <div class="text clearfix" style="text-align:center;">
                <span style="float:left;margin-left:1em;">优惠</span><span style="float:right;margin-right:1em;color:red;">-300</span>
            </div>
        </div>
        <div id="tttd">
            <p>实付 1800.00元</p>
            <button id="tduoshou">立即支付</button>
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
            object: [{
                clasSName: '课程一',
                shoppingcost: '费用：\xa0' + '1000' + "元"
                },{
                clasSName: '课程二',
                shoppingcost: '费用：\xa0' + '3000' + "元"
                }],
                allcost : "4000" + "元"
            }        
    },
    methods: {
        cR2cR_D(){
            this.$router.push('/courseRe/courseDetails')
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

#goodsinformation{
    max-height: 40%;
    border-bottom: 1px rgb(229, 229, 229) solid;
    margin-bottom: 2em;
}

.goods_content{
    width: 80%;
    border: 1px rgb(185, 185, 185) solid;
    margin: 1em auto 1em 10%;
    text-align: center;
}

#jisuan{
    height: 15%;
    border-bottom: 1px rgb(229, 229, 229) solid;
    border-top: 1px rgb(229, 229, 229) solid;
    margin-bottom: 2em;
}

#tttd{
    height: 12%;
    border-bottom: 1px rgb(229, 229, 229) solid;
    border-top: 1px rgb(229, 229, 229) solid;
}

#tttd p{
    margin-bottom: 0px;
    margin-top: 1.5em;
    margin-left: 7%;
}

#tduoshou{
  background-color: #7AB9F6;
  float:right;
  height: 3em;
  border-style: none;
  border-radius: 5px;
  color: #FFFFFF;
  margin-top:-2.2em;
  margin-right: 7%;
}

#tduoshou:active{
  transform: translateY(1px);
  background-color: rgb(108, 162, 216);
}
</style>
