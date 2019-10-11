<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">课程</span>
        </x-header>
        <div>
            <div class="player">
                <video-player  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"                 
                >
                </video-player>
            </div>
            <div id="tab-title_div">
              <ul class = "tab-title">
                <li @click="cur=0" :class="{active:cur==0}">课程信息</li>
                <li @click="cur=1" :class="{active:cur==1}">课程内容</li>
                <li @click="cur=2" :class="{active:cur==2}">实操培训</li>
              </ul>
            </div>
            <div class="tab-content" style="height:21em;">
              <div v-show="cur==0" style="height:100%">
                <div class="top_4" style="border-bottom: 1px rgb(229, 229, 229) solid;">
                  <div class="left_8">
                    <h3 v-html= object.title></h3>
                    <p v-html= object.grades style="display:inline"></p>
                    <!-- <img style="width:1em;height:1em;" id="favourable" v-bind:src="favourable"> -->
                    <p v-html= object.Teacher></p>
                  </div>
                  <div class="right_2">
                    <button v-on:click="cD2SC"><img id="shopping" v-bind:src="shopping"></button>
                  </div>
                </div>
                <div class="bottom_6">
                  <textarea v-html= object.introduction></textarea>
                </div>
                <div id="btm_btn">
                  <button style="margin-right:20%" @click="$router.push({path:'/courseRe/courseDetails/shoppingcart'})">加入购物车</button>
                  <button @click="$router.push({path:'/courseRe/courseDetails/shoppingcart/tttp'})">立刻购买</button>
                </div>
              </div>
              <div v-show="cur==1">
                <div v-for="(value,key) in values" :key="key" id="show_course">
                  <h3 v-html= value.unitTitle></h3>
                  <div v-for="(list,key0) in value.data.videoList" :key="key0">
                    <p  v-html= list.videoTitle @click="changeV(list.video,list.trainData)"></p>   
                  </div>               
                </div>
              </div>
              <div v-show="cur==2">
                <div v-for="(valuex,keyx) in valuexs" :key="keyx" id="show_shicao">
                  <div style="float:left;width:70%;">
                    <h3 v-html= "valuex.trainTitle"></h3>
                    <p  v-html= "valuex.trainCompanyName"></p>  
                    <p  v-html= "valuex.trainTime"></p>
                    <p  v-html= "valuex.maxNumber"></p>
                  </div>
                  <div style="float:left;width:30%;">
                    <button>报名参加</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
	</div>
</template>

<script>
import {
    XHeader,
    
} from 'vux'
import { videoPlayer } from 'vue-video-player';
import cover from '../../../assets/img/cover.jpg'
import video from '../../../assets/video/v1.mp4'
import favourable from '../../../assets/icon/favourable.png'
import shopping from '../../../assets/icon/shopping.png'

var groudid = '';

export default {
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: {
          type: "video/mp4",
          src: video //你的视频地址（必填）
        },
        poster: cover , //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
         timeDivider: false,
         durationDisplay: false,
         remainingTimeDisplay: false,
         fullscreenToggle: false  //全屏按钮
       }
      },
      cur: 0,
      object: {
        title : "" ,
        grades : "" ,
        Teacher : "教师名称：\xa0\xa0" + "刘国强" ,
        introduction : "教程简介：\n" + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget."
      },
      favourable : favourable,
      shopping : shopping,
      values:[],
      valuexs: []
    }
  },
  components: {
    videoPlayer,
    XHeader        
  },
  methods: {
    onPlayerPlay(player) {
      console.log("play");
    },
    onPlayerPause(player){
      console.log("pause");
    },
    cD2SC(){
      this.$router.push('/courseRe/courseDetails/shoppingcart')
    },
    begindo(){
      groudid = this.$route.query.g_id;
     // console.log(groudid);
      var Url = this.yuming + '/list/video/detail?VideoGroupNumber=' + groudid + '&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization');
      this.axios({
        method: 'GET' ,
        url: Url ,
        data:JSON.stringify({
          VideoGroupNumber : groudid
        })
      }).then(res =>{
        console.log(res.data);
        this.object.title = res.data.title;
        this.object.grades = res.data.grades;
        this.object.Teacher = res.data.teacher;
        this.object.introduction = res.data.introduction;
        this.values = res.data.list; 
        var videoUrl = res.data.list[0].data.videoList[0].video;
        videoUrl = 'http://47.101.155.73:8080' + videoUrl.replace('.','');
        this.$refs.videoPlayer.src = videoUrl;
       // console.log(this.playerOptions.sources.src);
      //  console.log(videoUrl);
        this.valuexs = res.data.list[0].data.videoList[0].trainData.trainList;
      }).catch(error => {
     // console.log('Error');
      });
    },
    changeV: function(video,trainData){
      var videoUrl = video;
      videoUrl = 'http://47.101.155.73:8080' + videoUrl.replace('.','');
      this.$refs.videoPlayer.src = videoUrl;
      this.valuexs = trainData.trainList;
     // console.log(this.playerOptions.sources.src);
     // console.log(videoUrl);
     // console.log(trainData.trainList);
    }
  },
  mounted:function(){
    this.begindo();
	},
  computed: {
    player() {
      return this.$refs.videoPlayer.player
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
.left-arrow:before {
    border: 2px solid #FFFFFF !important;
    border-width: 2px 0px 0px 2px !important;
}

#tab-title_div {
  height: 2.5em;
  text-align:center;
}
.tab-title {
  padding-left: 0px;
}

.tab-title li{
  float: left;
  width: 33%;
  text-align: center;
  color: black;
  list-style: none;
  padding-bottom: 1em;
  border-bottom: 1px rgb(229, 229, 229) solid;
}

.tab-title .active{
  border-bottom: 2px rgb(252, 55, 140) solid; 
  color: rgb(252, 55, 140);
}

.top_4{
  height: 30%;
}

.left_8{
  height: 100%;
  float: left;
  width: 80%;
}

.left_8 h3,p {
  margin: 0.4em 5% 0.4em;
}

.right_2{
  height: 100%;
  float: left;
  width: 20%;
}

.right_2 button {
  background-color: rgba(0,0,0,0);
  border: 2px #7AB9F6 solid;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  margin-top:14%;
}

/* .right_2 button :active {
  border: 2px rgb(108, 162, 216) solid;
  border-radius: 50%;
  width: 3em;
  height: 3em;
} */

#shopping {
  width: 2em;
  height: 2em;
  padding-top:3px;
  padding-right:3px;
}

.bottom_6{
  height: 50%;
  text-align: center;
}

.bottom_6 textarea{
  width: 86%;
  background-color: rgba(0,0,0,0);
  margin-top:4%;
  border: none;
  height: 80%;
}

#btm_btn {
  text-align: center;
}

#btm_btn button{
  margin-top: 3%;
  background-color: #7AB9F6;
  height: 3em;
  border-style: none;
  border-radius: 5px;
  color: #FFFFFF;
}

#btm_btn button:active{
  transform: translateY(1px);
  background-color: rgb(108, 162, 216);
}

#show_course h3{
  margin: 0.4em 5% 0.4em;
}

#show_course p{
  margin: 0.4em 8% 0.4em;
}

#show_shicao {
  height: 7.5em;
}

#show_shicao h3,p{
  padding-left: 7%;
  margin: 0.4em auto 0.4em;
}

#show_shicao button{
  margin-top: 50%;
  background-color: #7AB9F6;
  height: 3em;
  border-style: none;
  border-radius: 5px;
  color: #FFFFFF;
}

#show_shicao button:active{
  transform: translateY(1px);
  background-color: rgb(108, 162, 216);
}

</style>
