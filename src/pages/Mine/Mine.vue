<template>
  <div id="bg">
    <div id="top_half">
			<div >
      <div id="div_avatar_1" >
				<el-upload
  class="avatar-uploader"
  :action="url"
	name="head"
	:data=data
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img id="avatar_1" v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  <!-- <img id="avatar_1" v-if="imageUrl" :src="imageUrl" class="avatar"> -->

      </div>
      <div id="Login_status" style="text-align:center;"><div id="My_name"></div></div>
     </div>
		 </div>

			<div id="tab_1">
        <flexbox style="background-color: #90c4f7;height: 70px;">
          <flexbox-item>
						<div class="mine-demo" v-on:click="$router.push('/Mine/collection')">
           <i class="iconfont icon-shoucang" style="font-size: 26px;"></i><br>
				    <span slot="label">收藏</span>
          </div></flexbox-item>
          <flexbox-item><div class="mine-demo" v-on:click="$router.push('/Mine/brush')">
           <i class="iconfont icon-fankuiyijian" style="font-size: 26px;"></i><br>

				    <span slot="label">反馈</span>
          </div></flexbox-item>
          <flexbox-item><div class="mine-demo" v-on:click="$router.push('/Mine/setting')">
         <i class="iconfont icon-shezhi" style="font-size: 26px;"></i><br>

				    <span slot="label">设置</span>
          </div></flexbox-item>
        </flexbox>
      </div>

    <div class="buttom_half" >
      <group>
        <cell class="mine-cell" title="我的消息" is-link link="/Mine/message"><img slot="icon" width="30" :src="require('../../assets/img/xiaoxi.png')"></cell>
        <cell class="mine-cell" title="我的课程" is-link link="/Mine/myclass"><img slot="icon" width="30" :src="require('../../assets/img/kecheng.png')"></cell>
        <cell class="mine-cell" title="实名认证" is-link link="/Mine/smrz"><img slot="icon" width="30" :src="require('../../assets/img/smrz.png')"></cell>
      </group>
    </div>
  <tabbar style="	position: fixed;">
  			<tabbar-item style="text-decoration: none;"  link="/home">
  				<i class="iconfont icon-zhaopin" style="font-size: 32px;" slot="icon"></i>
  				<span slot="label">招聘</span>
  			</tabbar-item>
  			<tabbar-item style="text-decoration: none;" link="/train">
  				<i class="iconfont icon-zaixianpeixun"  slot="icon"></i>
  				<span slot="label">培训</span>
  			</tabbar-item>
  			<tabbar-item style="text-decoration: none;" selected link="/Mine">
  				<i class="iconfont icon-yonghu1" slot="icon"></i>
  				<span slot="label">我的</span>
  			</tabbar-item>
  
  		</tabbar>
  </div>
</template>

<script>
import { Group, Cell, XSwitch } from 'vux'
import { Flexbox, FlexboxItem,Tabbar,TabbarItem } from 'vux'


export default {
  data(){
    return {
			imageUrl:'',
			data:{
				loginId:localStorage.getItem('loginid'),
			},
			url:this.yuming + '/change/userAvatar?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
			
    }
  },
  components: {
    Group,
    Cell,
    XSwitch,
    Flexbox,
    Tabbar,
    TabbarItem,
    FlexboxItem
  },
  methods: {
			 handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
			
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
			
// 			
// 				 this.newVideo(file).then(res => {
//           console.log(res)
//         })
				console.log( isJPG && isLt2M)
        return isJPG && isLt2M;
      },
// 			newVideo (file) {
// 				console.log('a')
// 			console.log(file)
//   return this.axios({
//     method: 'post',
//      url: this.url,
//      timeout: 20000,
// 		 //dataType:'json',
//      data: {
// 			 head:file,
// 			 loginId:localStorage.getItem('loginid'),
// 		 },
//    })
//  },
//  newSubmitForm () {
//        this.$refs.newupload.submit()
//     },
      begindoit(){
        console.log(localStorage.getItem('Authorization'));
        this.axios({
          method: 'GET' ,
					url: this.yuming + '/homepage' + '?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
					data: {
            loginId: localStorage.getItem('loginid'),
            token: localStorage.getItem('Authorization')
          }
        }).then(res =>{
          console.log(res.data.head);
          var head = res.data.head.replace(".","");
         this.imageUrl = 'http://47.101.155.73:8080' + head ;
          document.getElementById("My_name").innerHTML = res.data.nickname ;
        }).catch(error => {
          alert('未登录');
          console.log(error);
        });
      }
  },
	
  mounted:function(){
    this.begindoit();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,body {
  margin: 0;             
  padding: 0;
  width: 100%;
  height: 100%;
}
.buttom_half .weui-cells {
	margin-top: 0px !important;
}
.avatar-uploader .el-upload {
    border: 0px ;
   border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
   border-radius: 50%;

  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
	
  }
#bg {
  margin: 0;             
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(245, 245, 245);
}

#top_half {
  height: 30%;
  width: 100%;
  position: relative; 
background: -webkit-linear-gradient(rgb(135, 124, 241), rgb(122, 185, 246)); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgb(135, 124, 241), rgb(122, 185, 246)); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgb(135, 124, 241), rgb(122, 185, 246)); /* Firefox 3.6 - 15 */
  background: linear-gradient(rgb(135, 124, 241), rgb(122, 185, 246)); /* 标准的语法（必须放在最后） */
}

#top_half #div_avatar_1 {
  padding-top: 10%;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;  
	
}

#top_half #avatar_1 {
  overflow: hidden;
  width: 80px;height: 80px;
  display: flex;border-radius: 50%;

}

#top_half #My_name {
  color: #FFF;
  padding-left: 0px;
	
	line-height: 60px;
}

 #tab_1 {
 
  opacity: 0.55;
  width: 100%;
  height: auto;
}

.mine-demo {
 
  text-align: center;
  color: #FFF;
  border-radius: 4px;
}

.mine-cell {
  padding-top: 15px;
  padding-bottom: 15px;
  color: #333;
  height: 38px;
}

.mine-cell img {
  display: block;
  margin-right: 15px;
}
</style>