<template>
	<div class="newspage">
		<div>
		 <x-icon type="ios-arrow-left" size="30" style="float:left;position: fixed;top:5px;fill:#7AB9F6"  @click="$router.push({path: '/home'})"></x-icon>
		 <br>
		</div>
<center>		
		<div class="title">
		<h2 style="width: 90%;margin-top: 10px;">{{title}}</h2>
		<h5 style="text-align: right;">{{date+publish}}</h5>
		</div>
</center>		
		<!-- <div v-for="src in list" style="text-align: center;">
			<img  class="imgbox" :src="src"></img>
		</div> -->
		
		<div class="contentbox">
		
		    <iframe width=100% height=500 frameborder=0 :src="content" noresize=false style="overflow-x: hidden;overflow-y: hidden;"></iframe>
		</div>
	</div>
</template>

<script>
	export default {
  components: {
  },
	methods:{
		getnewscontent() {
			console.log(this.$route.query.artcleid)
			console.log('b')
			
			this.axios.get(this.yuming + '/article/content', {
					params: {
						ArticleNumber:this.$route.query.artcleid,
						token:localStorage.getItem('Authorization'),
						loginId: localStorage.getItem('loginid'),
					}
				})
				.then((response) => {
					console.log(response.data)
					this.title= response.data.title
					this.date= response.data.time.substr(0,response.data.time.length-10)
					this.publish= response.data.author
					this.content=	this.yuming.substr(0,	this.yuming.length-5)+ '/GMap'+response.data.content.substr(1)

				})
		}
	},
	created(){
		this.getnewscontent()
	},
		data(){
			return{
				title:'全国人力资源和社会保障工作会议暨人社扶贫工作座谈会召开',
				date:'2019-01-02',
				publish:' 新华社',
				list:[
					'./static/img/newsimg1.png',
					'./static/img/newsimg2.png',
					],
				content:'　12月28日至29日，全国人力资源和社会保障工作会议暨人社扶贫工作座谈会在北京召开。会议总结2018年工作，分析形势，研究部署2019年重点任务，并对人社扶贫工作进行再动员再部署。人力资源社会保障部党组书记、部长张纪南出席会议并讲话。人社部党组成员出席会议.',			
			}
		}
	}
</script>

<style>

	.imgbox{
		width: 100%;

	}
	.contentbox{
		font-size: 12px;
		line-height: 20px;
	}
	.imgbox{
		width: 95%;
	}
</style>
