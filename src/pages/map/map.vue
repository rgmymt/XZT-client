<template>
	<div style="height: 100%;">
		<x-header :left-options="{backText: ''}">
			<span style="margin-top:5px;font-size:17px;">地图</span>
		</x-header>
		<div :style="{width:'100%',height:'400px'}">
			 <div class="amap-page-container">
      <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
	    <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :vid="index" :content="marker.content"></el-amap-marker>
  
	  </el-amap>
	  <div style="font-size: 18px;color: #077ACE;margin: 20px;margin-bottom: 10px;">{{this.$route.query.conpany}}</div>
	  <div style="font-size: 13px;margin-left: 20px;width: 80%;white-space: pre-wrap;">{{this.$route.query.address}}</div>
    </div>
		</div>

	
	</div>
</template>

<script>
	import { AMapManager } from 'vue-amap';
	 let amapManager = new AMapManager();
	import {
		XHeader,
	} from 'vux'
   
	export default {
		components: {
			XHeader,
		},
		methods: {

		
		},
		watch: {
	
		},
		mounted() {
			var mapstyle=document.getElementsByClassName('amap-page-container')[0]
			console.log(`${document.documentElement.clientHeight}`+"px")
			var height=document.documentElement.clientHeight-200
			mapstyle.style.height=height.toString()+"px"
		},
		created() {
		
		},
		data() {
			let mycenter=[parseFloat(this.$route.query.longitude), parseFloat(this.$route.query.latitude)]
			let name=this.$route.query.conpany
			console.log(name)
			console.log(mycenter)
			return {
				zoom: 12,
				center: mycenter,
				amapManager,
				  markers: [
					  {
						  position:mycenter,
						  content:'<div style="margin-top:30px;font-size:15px;width:300px">'+name+'</div>'
					  }
				  ],
				events: {
				init(map) {
			
					AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
					const marker = new SimpleMarker({
						
						iconStyle: 'red',
						map: map,
						position:mycenter
					});
					});
					
				}
				}
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

		.amap-logo {
			display: none !important;
		}
	
		.amap-copyright {
			display: none !important;
		}
	
</style>
