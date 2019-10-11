<template> 
	<div>
		<div style="position: fixed;width: 100%;top:0px;z-index: 2;">
			<x-header :left-options="{backText: ''}">
				<span style="margin-top:5px;font-size:17px;">错题本</span>
			</x-header>
			<div class="papertitle" style="background-color: #FFFFFF;text-align: left;padding-left: 10px;">
				{{papertitle}}
				<span style="float: right;margin-right: 10px;color: #AEEEEE;">{{(SwiperItemIndex+1)+'/'+num}}</span>
			</div>
		</div>
		<swiper width="100%" height="600px" :show-dots="false" v-model="SwiperItemIndex" :min-moving-distance="100" style="padding-top: 100px;">
			
			<swiper-item v-for="i in num" style="height: auto;">
				<img src="../../assets/icon/delete.png" style="width: 20px;float: right;margin-right: 20px;margin-top: 10px;" @click="shanchu">
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
												<el-radio  :label="'A'">A.正确</el-radio>
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
		Scroller
	} from 'vux'

	export default {
		components: {
			XHeader,
			Swiper,
			SwiperItem,
			Checklist,
			XButton,
			Scroller
		},
		ready() {

		},
		watch: {
			SwiperItemIndex(newindex, oldindex) {
				this.showkey = false
				this.radio=''
				this.showxuanze = false
				this.showpanduan = false
				this.showtiankong = false
				this.showzonghe = false
				this.getquestionlist()
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
			shanchu(){
				console.log(this.question.realID)
					this.axios({
						method:'post',
						url:	this.yuming + '/msg/errorBook/remove'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
						dataType:'json',
						data:{
							questionID: this.question.realID,
							token: localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
							
					}
					})
				
						.then((response) => {
							console.log(response.data)
							this.answerlist=response.data
						})
			},
			pigai(){
				console.log('1')
					this.postanswer()
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
			postanswer() {
				this.axios({
					method:'post',
					url:	this.yuming + '/exercise/answer'+'?loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization'),
					dataType:'json',
					data:{
						questionID: this.question.realID,
						answer:this.radio,
						loginId: localStorage.getItem('loginid'),
						simulationID:0,
				}
				})
			
					.then((response) => {
						console.log(response.data)
						this.answerlist=response.data
					})
			},
		},
		created() {
			this.getquestionlist()
			this.papertitle=this.$route.query.papertitle
			console.log(this.$route.query.papertitle)
		},
		data() {
			return {
				radio:'',
				num: '',
				showxuanze: false,
				showpanduan: false,
				showtiankong: false,
				showzonghe:false,
				showkey: false,
				SwiperItemIndex: 0,
				papertitle: '',
				fullValues: [],
				question: [],
				answerlist:[],
				
// 				questionlist: [{
// 						type: '单选题',
// 						number: 1,
// 						title: 'IP中潜影信息的读出是通过（ ）',
// 						choice: [
// 							'A.X线曝光',
// 							'B.强光照射',
// 							'C.激光束扫射',
// 							'D.显定影处理',
// 							'E.胶片复制',
// 						],
// 					},
// 					{
// 						type: '单选题',
// 						number: 2,
// 						title: 'IP中潜影信息的读出是通过（ ）',
// 						choice: [
// 							'A.X线曝光',
// 							'B.强光照射',
// 							'C.激光束扫射',
// 							'D.显定影处理',
// 							'E.胶片复制',
// 						],
// 					},
// 					{
// 						type: '单选题',
// 						number: 3,
// 						title: 'IP中潜影信息的读出是通过（ ）',
// 						choice: [
// 							'A.X线曝光',
// 							'B.强光照射',
// 							'C.激光束扫射',
// 							'D.显定影处理',
// 							'E.胶片复制',
// 						],
// 					}
// 
// 				],

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

	.papertitle {
		box-shadow: 0px 3px 10px #DBDBDB;
		font-size: 15px;
		line-height: 40px;
		
	}

	.question-demo {
		margin: 10px;
	}

</style>
