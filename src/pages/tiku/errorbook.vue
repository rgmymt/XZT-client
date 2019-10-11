<template>
	<div class="errorpage">
		<x-header :left-options="{backText: ''}">
			<span style="margin-top:5px;font-size:17px;">错题本</span>
		</x-header>
		<div style="margin-top: 20px;">
			<el-tree :data="errorlist1" :props="defaultProps"  @node-click="handleNodeClick"  style="font-size: 15px;width: 80%;margin-left: auto;margin-right: auto;" >
			
			</el-tree>
		<!-- 	<div class="error-cell" v-for="(error,id) in typelist" :key="id">
				<div style="width: 80%;float: left;height: 40px;" @click="$router.push({path:'/errordetil'})">
					{{error.errortype}}
					<span style="font-size:12px;margin-left: 10px;color: #C1C1C1;">{{error.num}}</span>
				</div>
				<x-icon type="ios-close-outline" size="25" style="float: right;fill:#FF0000" @click="delect=error.errortype"></x-icon>
			</div> -->
		</div>
	</div>
</template>

<script>
	import {
		XHeader,
	} from 'vux'

	export default {
		components: {
			XHeader,
		},
		methods: {
			geterrorlist() {
				this.axios.get(this.yuming + '/exercise/error/group', {
						params: {
							token: localStorage.getItem('Authorization'),
							loginId: localStorage.getItem('loginid'),
						}
					})
					.then((response) => {
						console.log(response.data.data.type)
						this.errorlist=response.data.data.type
						this.errorlist1=response.data.data.type
						console.log(this.errorlist1)
						for(var i=0;i<this.errorlist.length;i++){
									console.log(this.errorlist[i].groupData.info)
						this.errorlist1[i].name=(this.errorlist[i].typeName)

						this.errorlist1[i].children=(this.errorlist[i].groupData.info)

					}
					console.log(this.errorlist1)
					})
			},
		
			   handleNodeClick(data) {
					 if(data.groupID!=undefined)
						this.$router.push({path:'/errordetil',query:{paperid:data.groupID,papertitle:data.name}})
        console.log(data);
				
      },
			
		},
		created() {
			this.geterrorlist()
		
		},
		data() {
			return {
				delect: null,	   
        defaultProps: {
          children: 'children',
          label: 'name'
        },
				errorlist:[],
				errorlist1:[],
				typelist: [{
						errortype: '焊工一级',
						num: 12,
					},
					{
						errortype: '焊工二级',
						num: 22,
					},
					{
						errortype: '电工二级',
						num: 32,
					},
				],
			}
		}
	}
</script>

<style>
	.errorpage{
	
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


	.el-tree-node__label {
		font-size: 17px !important;
		line-height: 40px !important;
		background-color: rgb(245, 245, 245)
}
.el-tree-node__content{
	height: 40px !important;
background-color: rgb(245, 245, 245)

}
</style>
