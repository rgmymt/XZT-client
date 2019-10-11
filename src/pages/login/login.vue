<template>
	<div id="bg">

		<div id="avatar_div">
			<img id="aaa" v-bind:src="avatar_1" />
		</div>
		<div id="input_div">
			<flexbox style="width: 80%;margin-left: auto;margin-right:auto;">
				<flexbox-item :span="4/5" >
					<div style="border-bottom: 0.5px solid #E0E0E0;margin: 10px 15px;">
					<x-input class="input_1" placeholder="用户名"  v-model="loginForm.phone" style="padding: 0px;">
						<i slot="label" class="iconfont icon-yonghu" style="padding-right:10px;display:block;font-size: 20px;color: #077ACE;"></i>
					</x-input>
					</div>
				</flexbox-item>
				<flexbox-item :span="1/5"></flexbox-item>
			</flexbox>
			<flexbox style="width: 80%;margin-left: auto;margin-right:auto ;">
				<flexbox-item :span="4/5">
					<div style="border-bottom: 0.5px solid #E0E0E0;margin: 10px 15px;">
					<x-input class="input_1" type="password" placeholder="密码" v-model="loginForm.password" style="padding: 0px;">
						<i slot="label" class="iconfont icon-suo" style="padding-right:10px;display:block;font-size: 20px;color: #077ACE;"></i>
					</x-input>
					</div>
				</flexbox-item>
				<flexbox-item :span="1/5">
					<a id="s_font" v-on:click="Login2Forget">忘记密码?</a>
				</flexbox-item>
			</flexbox>
			<flexbox style="width: 80%;margin-left: auto;margin-right:auto ;">
				<flexbox-item :span="3/5" >
					<div style="border-bottom: 0.5px solid #E0E0E0;margin: 10px 15px;">
					<x-input class="input_1"  v-model="yzm"  placeholder="验证码"  id="yzminput" style="padding: 0px;">
						<i slot="label" class="iconfont icon-yanzheng" style="padding-right:10px;display:block;font-size: 20px;color: #077ACE;"></i>
					</x-input>
					</div>
				</flexbox-item>
				<flexbox-item :span="1/5">
					<canvas  id="CAPTCHA" v-on:click="capOn"></canvas>	
				
				</flexbox-item>
				<flexbox-item :span="1/5">
				<a id="s_font" v-on:click="capOn">看不清?</a>
				</flexbox-item>
			</flexbox>
	

			
		</div>
		<div id="button_div">
			<button class="log-btn-1" v-on:click="Login2home">登陆</button><br>
			<button class="log-btn-2" @click="Login2Registe">注册</button><br>
		</div>
		<toast v-model="showtishi" type="text" :time="800" is-show-mask :text="tishi" position="middle" style="width: auto;"></toast>
	</div>
</template>



<script>
	import aaa_1 from '../../assets/icon/login.png'
	import CAPTCHA_1 from '../../assets/img/123.jpg'
	import {
		mapMutations
	} from 'vuex';
	
	var yanzhengma = ""
	import {
		Toast,
		Flexbox,
		FlexboxItem,
		XInput
	} from 'vux'
	export default {
		components: {
			Toast,
			Flexbox,
			FlexboxItem,
			XInput
		},
		data() {
			return {
				showtishi: false,
				tishi: '',
				yzm:'',
				avatar_1: aaa_1,
				CAPTCHA_1: CAPTCHA_1,
				loginForm: {
					phone: '',
					password: ''
				},
				userToken: ''
			}
		},
		methods: {
			...mapMutations(['changeLogin','setlogin']),
			Login2Registe() {
				console.log('a');
				this.$router.push('/registe')
			},
			Login2Forget() {
				this.$router.push('/Forget')
			},
			Login2home() {
				let _this = this;
				if (this.loginForm.phone === '' || this.loginForm.password === '') {
					//alert('账号或密码不能为空');
					this.showtishi = true
					this.tishi = '账号密码不能为空  '
				} else {
					var x = document.getElementById("yzminput");
					//console.log(x.value)
					if (this.yzm != yanzhengma) {
						//alert('验证码错误');
						this.showtishi = true
						this.tishi = '验证码错误'
					} else {
						this.axios({
							method: 'post',
							url: this.yuming + '/login1',
							data: _this.loginForm
						}).then(res => {
							console.log(res.data);
							_this.userToken = res.data.data.token;
							console.log(res.data.data.loginId);
							_this.changeLogin({
								Authorization: _this.userToken,
								loginid: res.data.data.loginId
							});
							_this.setlogin( _this.loginForm);
							
							_this.$router.push('/home');
						 }).catch(function (error) {
							//alert('账号或密码错误');
							this.showtishi = true
							this.tishi = '账号密码错误  '
							console.log(error);
						});
					}
				}
			},
			randomNum: function(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			randomColor: function(min, max) {
				var _r = this.randomNum(min, max);
				var _g = this.randomNum(min, max);
				var _b = this.randomNum(min, max);
				return "rgb(" + _r + "," + _g + "," + _b + ")";
			},
			drawPic: function() {
				var $canvas = document.getElementById("CAPTCHA");
				var _str = "0123456789"; //设置随机数库
				var _picTxt = ""; //随机数
				var _num = 4; //4个随机数字
				var _width = $canvas.width;
				var _height = $canvas.height;
				var ctx = $canvas.getContext("2d"); //获取 context 对象
				ctx.textBaseline = "bottom"; //文字上下对齐方式--底部对齐
				ctx.fillStyle = this.randomColor(180, 240); //填充画布颜色
				ctx.fillRect(0, 0, _width, _height); //填充矩形--画画
				for (var i = 0; i < _num; i++) {
					var x = (_width - 10) / _num * i + 10;
					var y = this.randomNum(_height / 2, _height);
					var deg = this.randomNum(-45, 45);
					var txt = _str[this.randomNum(0, _str.length)];
					_picTxt += txt; //获取一个随机数
					ctx.fillStyle = this.randomColor(10, 100); //填充随机颜色
					ctx.font = this.randomNum(40, 90) + "px SimHei"; //设置随机数大小，字体为SimHei
					ctx.translate(x, y); //将当前xy坐标作为原始坐标
					ctx.rotate(deg * Math.PI / 180); //旋转随机角度
					ctx.fillText(txt, 0, 0); //绘制填色的文本
					ctx.rotate(-deg * Math.PI / 180);
					ctx.translate(-x, -y);
				}
				for (var i = 0; i < _num; i++) {
					//定义笔触颜色
					ctx.strokeStyle = this.randomColor(90, 180);
					ctx.beginPath();
					//随机划线--4条路径
					ctx.moveTo(this.randomNum(0, _width), this.randomNum(0, _height));
					ctx.lineTo(this.randomNum(0, _width), this.randomNum(0, _height));
					ctx.stroke();
				}
				for (var i = 0; i < _num * 10; i++) {
					ctx.fillStyle = this.randomColor(0, 255);
					ctx.beginPath();
					//随机画原，填充颜色
					ctx.arc(this.randomNum(0, _width), this.randomNum(0, _height), 1, 0, 2 * Math.PI);
					ctx.fill();
				}
				return _picTxt; //返回随机数字符串
			},
			capOn(e) {
				e.preventDefault();
				yanzhengma = this.drawPic();
				console.log(yanzhengma);
			}
		},

		mounted() {
			var bg = document.getElementById('bg')
			bg.style.height = `${document.documentElement.clientHeight}` + "px"
			bg.style.backgroundColor = "#FFFFFF"
			bg.style.margin = "0px"
			yanzhengma = this.drawPic();
			console.log(yanzhengma);
			console.log(localStorage.getItem('phone'))
				console.log(localStorage.getItem('password'))
			if(localStorage.getItem('phone')!=''&&localStorage.getItem('password')!=''||localStorage.getItem('phone')!=null&&localStorage.getItem('password')!=null){
				
			this.axios({
				method: 'post',
				url: this.yuming + '/login1',
				data: {
					phone:localStorage.getItem('phone'),
					password:localStorage.getItem('password')
				}
			}).then(res => {
				console.log(res.data);
				this.userToken = res.data.data.token;
				console.log(res.data.data.loginId);
				this.changeLogin({
					Authorization: this.userToken,
					loginid: res.data.data.loginId
				});
			
				this.$router.push('/home');
			
			}).catch(error => {
			
				console.log(error);
			});
			}
		}
	}
</script>
<style>
	#avatar_div {

		text-align: center;
	}

	.weui-toast__content {
		white-space: nowrap;

	}

	.vux-toast-middle {
		width: auto !important;
		padding-left: 0px;
		padding-right: 20px;
		font-size: 10px;
	}
	#yzminput{
		margin: 0px !important;
	}
	#aaa {
		height: 200px;
		width: 200px;
		overflow: hidden;
		border-radius: 50%;
		margin: 0px auto;
		padding-top: 50px;
	}

	#input_div {
		margin: 2em auto;

	}

	#input_div a {
		text-decoration: none;
		color: #333333;
	}

	.input_1 {
		
		overflow: hidden;
		font-size: 13px;

		
	}

	#s_font {
		font-size: 13px;
		white-space: nowrap;
	}

	.input_2 {
		width: 35%;
		padding: 0 15px;
		font-size: 13px;
		border: 1px solid #EBEBEB;
		margin: 0 auto 0.7em;
		height: 2.2em;
		line-height: 2.2em;
		vertical-align: middle;
	}

	#CAPTCHA {
		width: 100%;
		height: 1.8em;
		
		margin-bottom: 0.6em;
		vertical-align: middle;
		cursor: pointer;
	}

	#button_div {
		text-align: center;
		overflow: hidden;
		margin-top: 15%;
	}

	.log-btn-1 {
		width: 68%;
		text-align: center;
		line-height: 40px;
		margin: 0 auto 15px;
		height: 40px;
		color: #fff;
		font-size: 12px;
		background-color: #FF8800;
		border-style: none;
		outline: none;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		-ms-border-radius: 5px;
		-o-border-radius: 5px;
		border-radius: 5px;
	}

	.log-btn-1:active {
		background-color: #FFAA33;
		transform: translateY(1px);
	}

	.log-btn-2 {
		width: 68%;
		text-align: center;
		line-height: 40px;
		margin: 0 auto;
		height: 40px;
		color: #FF8800;
		font-size: 13px;
		background-color: #fff;
		border: 1px solid #FF8800;
		outline: none;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		-ms-border-radius: 5px;
		-o-border-radius: 5px;
		border-radius: 5px;
	}

	.log-btn-2:active {
		transform: translateY(-1px);
	}
</style>
