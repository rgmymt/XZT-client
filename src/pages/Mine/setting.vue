<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">设置</span>
        </x-header>
        <div id="setting_div">
            <group>
                <cell style="height:2em;" title="修改密码" is-link link="/forget"></cell>
                <!-- <cell style="height:2em;" title="手机号" is-link link="/Mine/setting/changephone"></cell> -->
                <!-- <cell style="height:2em;" title="个人资质" is-link></cell> -->
                <cell style="height:2em;" title="联系我们" is-link></cell>
                <cell style="height:2em;" title="关于我们" is-link></cell>
                <cell style="height:2em;" title="退出登陆" is-link  @click.native="killid"></cell>
            </group>
        </div>
	</div>
</template>

<script>
import {
    XHeader,Group,Cell
} from 'vux'
export default {
    components: {
        XHeader,
        Group,
        Cell
    },
    data() {
        return {
            }        
    },
    methods: {
      killid(){
			
        this.axios({
          method: 'delete' ,
					url: this.yuming + '/logout' ,
					data: {
            loginId: localStorage.getItem('loginid'),
            token: localStorage.getItem('Authorization')
          }
        }).then(res =>{
          localStorage.setItem('Authorization', '');
          localStorage.setItem('loginid', '');
					localStorage.setItem('phone', '');
					localStorage.setItem('password', '');
					this.$router.push({path:'/login'})

        }).catch(error => {
          alert('未登录');
          console.log(error);
        });
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




.blue_btn {
  margin-top: 10%;
  background-color: #7AB9F6;
  height: 3.5em;
  width: 8em;
  border-style: none;
  border-radius: 5px;
  color: #FFFFFF;
}

.blue_btn :active{
  transform: translateY(1px);
  background-color: rgb(108, 162, 216);
}


</style>