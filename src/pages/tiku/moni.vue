<template>
	<div>

		<div style="position: fixed;width: 100%;top:0px;z-index: 2;">
			<div style="background-color:#7AB9F6 ;height: 47px;text-align: center;">
				<x-icon type="ios-arrow-left" size="30" style="fill:#FFFFFF;float: left;margin-top: 10px;" @click="quit"></x-icon>

				<span style="font-size:17px;line-height: 47px;margin-left: -40px;color: #FFFFFF;">{{papertitle}}</span>

			</div>
			<div class="papertitle" style="background-color: #FFFFFF;">
				<span style="color: #AEEEEE;padding-left: 40px;">{{(SwiperItemIndex+1)+'/'+num}}</span>
				<span style="float: right;margin-right: 10px;">
					{{minute}}:{{second}}
				</span>
			</div>
		</div>
		<swiper width="100%"  :show-dots="false" v-model="SwiperItemIndex" :min-moving-distance="100" style="padding-top: 100px;">

			<swiper-item v-for="i in num" style="height: auto;">
				<div style="margin: 15px; z-index: -1;">
					<div v-if="showxuanze">
						<span style="border-radius:10px;background-color: #ADD8E6;width: 50px;font-size: 12px;padding: 2px 10px;">{{question.type}}</span>
						<br>
						<span style="line-height: 40px;font-size: 16px;margin-left: 10px;">{{(SwiperItemIndex+1)+'.'+' '+question.stem}}</span>

						<div v-for="(choose,key) in question.choice" :key="key" style="margin-top: 10px;margin-left: 20px;">
							<el-radio v-model="radio" :label="key">{{choose}}</el-radio>
						</div>
					</div>
					<div v-if="showtiankong">
						<span style="border-radius:10px;background-color: #ADD8E6;width: 50px;font-size: 12px;padding: 2px 10px;">{{question.type}}</span>
						<br>
						<span style="line-height: 40px;font-size: 16px;margin-left: 10px;">{{(SwiperItemIndex+1)+'.'+' '+question.stem}}</span>
						<el-input v-model="radio" placeholder="请输入答案" style="margin-top: 20px;"></el-input>
					</div>
					<div v-if="showzonghe">
						<span style="border-radius:10px;background-color: #ADD8E6;width: 50px;font-size: 12px;padding: 2px 10px;">{{question.type}}</span>
						<br>
						<span style="line-height: 40px;font-size: 16px;margin-left: 10px;">{{(SwiperItemIndex+1)+'.'+' '+question.stem}}</span>

					</div>
					<div v-if="showpanduan">
						<span style="border-radius:10px;background-color: #ADD8E6;width: 50px;font-size: 12px;padding: 2px 10px;">{{question.type}}</span>
						<br>
						<span style="line-height: 40px;font-size: 16px;margin-left: 10px;">{{(SwiperItemIndex+1)+'.'+' '+question.stem}}</span>
						<div style="margin-left: 20px;">
							<el-radio-group v-model="radio">
								<div style="margin-top: 20px;">
									<el-radio :label="'A'">A.正确</el-radio>
								</div>
								<div style="margin-top: 20px;">
									<el-radio :label="'B'">B.错误</el-radio>
								</div>
							</el-radio-group>
						</div>
					</div>
					<div v-if="!showkey" style="padding:15px;margin-top: 200px;" @click="showkey=true">
						<x-button type="primary" style="width: 80%;line-height: 30px;font-size: 13px;" @click.native="pigai">确定</x-button>
					</div>
					
					<div v-if="showkey" style="padding:15px;margin-top: 20px;">
						<div v-if="answerlist.whether">
							<span>回答正确</span>
						</div>
						<div v-else>
							<span>回答错误</span>
							{{'正确答案：'+answerlist.answer}}
						</div>
						<div>解析：</div>
						<div>{{answerlist.analysis}}</div>
					</div>
					<div v-transfer-dom>
					<alert v-model="showscore" :title="'成绩'" > 
					<div style="font-size: 25px;color:#000000;text-align: center;">
					{{ score }}
					</div>
					</alert>
					</div>
				</div>
			</swiper-item>

		</swiper>
	</div>
</template>

<script>
	import {
		XHeader,
		Swiper,
		SwiperItem,
		Checklist,
		XButton,
		Alert,
		Flexbox,
		FlexboxItem,
		TransferDomDirective as TransferDom
	} from 'vux'

	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			Flexbox,
			FlexboxItem,
			Swiper,
			SwiperItem,
			Checklist,
			XButton,
			Alert,

		},
		watch: {
			showscore(newscore,oldscore){
				if(newscore==false)
				this.$router.go(-1)
			},
			SwiperItemIndex(newindex, oldindex) {
			
				this.showkey = false
				this.radio = ''
				this.showxuanze = false
				this.showpanduan = false
				this.showtiankong = false
				this.showzonghe = false
				this.getquestionlist()
			},
			seconds: {
				handler(newVal) {
					if (newVal < 10)
						this.second = "0" + newVal
					else
						this.second = newVal
				}
			},
			minutes: {
				handler(newVal) {
					if (newVal < 10)
						this.minute = "0" + newVal
					else
						this.minute = newVal
				}
			}
		},
		mounted(){
			var body=document.getElementsByClassName("vux-swiper")[0]
			console.log(body)
			var height=document.documentElement.clientHeight-280
			console.log(height.toString())
			body.style.paddingBottom=height.toString()+'px'
			console.log(body)
		},
		methods: {
			quit() {
				if(this.alreadydone==0)
					this.$router.go(-1)
				this.showscore=true
				this.postquit()
				
			},
			pigai() {
				this.alreadydone++
				this.showkey=true
				this.postanswer()
				if(this.SwiperItemIndex==this.num-1)
				this.quit()
				
				
			},
			getquestionlist() {
				this.axios.get(this.yuming + '/msg/exercises', {
						params: {
							number: this.SwiperItemIndex + 1,
							groupID: this.$route.query.paperid,
							token: localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
						}
					})
					.then((response) => {
						console.log(response.data.data.info)
						this.num = response.data.data.all
						this.question = response.data.data.info
						console.log(this.question.type)
						if (this.question.type == "选择题")
							this.showxuanze = true
						if (this.question.type == "综合题 ")
							this.showzonghe = true
						if (this.question.type == "判断题")
							this.showpanduan = true
						if (this.question.type == "填空题")
							this.showtiankong = true
						console.log(this.showzonghe)
					})
			},
			postquit() {
				this.axios({
						method: 'post',
						url: this.yuming + '/exercise/test/quit' + '?loginId=' + localStorage.getItem('loginid') + '&token=' + localStorage.getItem('Authorization'),
						dataType: 'json',
						data: {
							token: localStorage.getItem('Authorization'),
							groupID: this.paperid,
							loginId: localStorage.getItem('loginid'),
						}
					})
					.then((response) => {
						console.log(response.data)
						
					})
			},
			postanswer() {
				this.axios({
						method: 'post',
						url: this.yuming + '/exercise/answer' + '?loginId=' + localStorage.getItem('loginid') + '&token=' + localStorage.getItem('Authorization'),
						dataType: 'json',
						data: {
							questionID: this.question.realID,
							answer: this.radio,
							loginId: localStorage.getItem('loginid'),
							simulationID: 0,
						}
					})

					.then((response) => {
						console.log(response.data)
						this.answerlist = response.data
					})
			},

		},
		created() {
			var _this = this;
			var time = window.setInterval(function() {
				if (_this.seconds == 0 && _this.minutes != 0) {
					_this.seconds = 59;
					_this.minutes -= 1;
				} else if (_this.minutes == 0 && _this.seconds == 0) {
					_this.seconds = 0;
					window.clearInterval(time);

				} else {
					_this.seconds -= 1
				}

			}, 1000);
			this.getquestionlist()
			this.papertitle = this.$route.query.papertitle
			this.paperid=this.$route.query.paperid
			console.log(this.$route.query.papertitle)
		},


		data() {
			return {
				paperid:'',
				alreadydone:0,
				minutes: 59,
				seconds: 59,
				minute: 59,
				second: 59,
				showover: false,
				showscore: false,
				SwiperItemIndex: 0,
				score: 99,
				fullValues: [],
				questionnum: '',
				radio: '',
				num: '',
				showxuanze: false,
				showpanduan: false,
				showtiankong: false,
				showzonghe: false,
				showkey: false,

				papertitle: '',

				question: [],
				answerlist: [],

			}
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

	.question-demo {
		margin: 10px;
	}

	.papertitle {
		box-shadow: 0px 3px 10px #DBDBDB;
		font-size: 15px;
		line-height: 40px;
		text-align: center;
	}
</style>
