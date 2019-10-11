<template>
	<div style="height: 100%;">
		<div style="position: fixed;width: 100%;top:0px">
		<x-header :left-options="{backText: ''}" >
			<span style="margin-top:5px;font-size:17px;">附近的工作</span>
		</x-header>
		<div :style="{width:'100%',height:'300px'}">
			<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult">
			</el-amap-search-box>
			<el-amap ref="map" vid="amap"  :amap-manager="amapManager"  :center="mapCenter" :plugin="plugin" :zoom="zoom" :resizeEnable="true" :events="events"
			 class="amap-demo">
				<el-amap-marker v-for="(marker,id) in markers" :key="id" :position="marker.position" :content="marker.content"
				 :events="marker.events"></el-amap-marker>
			</el-amap>
		</div>
		</div>
		<div class="toolbar" style="margin-top: 380px;">
		
				<div v-if="loaded">
				<br>
				<div v-if="zhoubianlist.length!=0">
				
				<div v-for="(context,id) in zhoubianlist" :key="id" @click="$router.push({path:'/applydetil',query:{applyid:context.recruitID}})">
					<flexbox>
					<flexbox-item :span="1/5" style="margin: 0px;">
					<img src="../../assets/icon/fujinicon.png" style="width: 50px;vertical-align: middle;" >
					<span style="font-size: 17px;margin-left: -34px;color: #FFFFFF;">{{id+1}}</span>
					</flexbox-item >
				<flexbox-item :span="2/5" style="margin: 0px;">
				<span style="color: #077ACE;line-height: 30px">{{context.company}}</span>
				<br>
				<span style="line-height: 30px;font-size: 13px;color: #666666;">{{context.workplace}}</span>
				<br>
				<span style="line-height: 20px;font-size: 13px;">{{'电话：'+context.phone}}</span>
				</flexbox-item >
					<flexbox-item :span="2/5" style="margin: 0px;">
						<img v-if="context.cover!=null" style="width: 95%;" :src="yuming.substr(0,yuming.length-5)+context.cover.substr(1)"></img>
					</flexbox-item >
					</flexbox>
				<br>
				</div>
			
				</div>
				<span v-else>暂时无数据</span>
			</div> 

				<span v-else>正在搜索</span>
		</div>

	</div>
</template>

<script>
	import { AMapManager } from 'vue-amap';
	 let amapManager = new AMapManager();
	import {
		XHeader,
		Flexbox,
		FlexboxItem,
	
		
	} from 'vux'
	export default {
		components: {
			XHeader,
			Flexbox,
			FlexboxItem,
		
		},
		methods: {
			 getMap() {
          // amap vue component
         // console.log(amapManager._componentMap);
          // gaode map instance
          //console.log(amapManager._map.getCenter());
        },
			getzhoubian() {
				//console.log(this.northeast.lat)
				//console.log(this.southwest.lng)
						this.axios.get(this.yuming + '/msg/recruit/nearby', {
								params: {
								longitude:this.mapCenter[0],
								latitude:this.mapCenter[1],
								longitudeUL:this.southwest.lng,
								latitudeUL:this.northeast.lat,
								longitudeUR:this.northeast.lng,
								latitudeUR:this.northeast.lat,
								longitudeDL:this.southwest.lng,
								latitudeDL:this.southwest.lat,
								longitudeDR:this.northeast.lng,
								latitudeDR:this.southwest.lat,
								token:localStorage.getItem('Authorization'),
								loginId: localStorage.getItem('loginid'),
								}
							})
							.then((response) => {
								console.log(response.data.recruit.info)
								this.zhoubianlist=response.data.recruit.info;
								
							}).catch(error => {
								this.zhoubianlist=[];
									//console.log(error);
								})
					},
			logMapBounds() {
				//console.log('a')
			},
			addMarker() {
				let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
				let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
				this.markers.push([lng, lat]);

			},
			onSearchResult(pois) {
				let latSum = 0;
				let lngSum = 0;
				if (pois.length > 0) {
					pois.forEach(poi => {
						let {
							lng,
							lat
						} = poi;
						lngSum += lng;
						latSum += lat;
						this.markers.push([poi.lng, poi.lat]);
					});
					let center = {
						lng: lngSum / pois.length,
						lat: latSum / pois.length
					};
					this.mapCenter = [center.lng, center.lat];
				}
			},
		
		},
		watch: {
					northeast(){
						//console.log('a')
						//console.log(this.northeast)
						//console.log(this.southwest)
						this.getzhoubian()
					},
// 					zhoubianlist(newlist,oldlist){
// 						if(newlist.length!=0&&oldlist==0)
// 						{
// 								setTimeout(() => {
// 							
// 														let cluster = new AMap.MarkerClusterer(amapManager._map, this.markerRefs, {
// 															gridSize: 80,
// 															renderCluserMarker: self._renderCluserMarker
// 														});
// 							
// 													}, 1000);
// 						}
// 					}
			mapCenter(newcerter) {
				console.log('a')
				let self = this;
				let markers = [];
				let index = 0;
				let basePosition = newcerter;
				//console.log(this.zhoubianlist)
				for (index = 0; index < this.zhoubianlist.length; index++) {
					var i=index+1;
				
					markers.push(
					{
						position: [this.zhoubianlist[index].longitude, this.zhoubianlist[index].latitude],
						content: '<div style="text-align:center;font-size:10px ;color:#FFFFFF;background-color: hsla(0, 100%, 50%, 0.7); height: 15px; width: 15px; border: 1px solid hsl(0, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;">'+i+'</div>',
						events: {
							init(o) {
								self.markerRefs.push(o);
							}
						}
					}
					);
				}

				this.markers = markers;

			}
		},
		created() {


		},
		data() {
			let self = this;
		
			return {
				 amapManager,
				northeast: [],
				southwest: [],
				zhoubianlist: [],
				markers: [],
				markerRefs: [],
				searchOption: {
					city: '杭州',
					citylimit: false
				},
				zoom: 12,
				mapCenter: [121.59996, 31.197646],
				lng: 0,
				lat: 0,
				loaded: true,
				plugin: [{
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 100, //超过10秒后停止定位，默认：无穷大
					maximumAge: 0, //定位结果缓存0毫秒，默认：0
					convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: true, //显示定位按钮，默认：true
					buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
					showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					extensions: 'all',
					pName: 'Geolocation',

					events: {
						init(o){
							
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								if (result && result.position) {
									self.lng = result.position.lng;
									self.lat = result.position.lat;
									self.mapCenter = [self.lng, self.lat];
									self.loaded = true;
									self.$nextTick();
								}
							});
						}
					}
				}],
				events: {
				
					'moveend': () => {
						this.mapCenter = [amapManager._map.getCenter().lng,amapManager._map.getCenter().lat]
						
						//this.mapCenter = [center.lng, center.lat];
						self.northeast=amapManager._map.getBounds().northeast
						self.southwest =amapManager._map.getBounds().southwest
// 						console.log(self.northeast)
// 						console.log(self.southwest)
					
						
					},
					'zoomchange': () => {
						this.mapCenter = [amapManager._map.getCenter().lng,amapManager._map.getCenter().lat]
						console.log(this.mapCenter)
						self.northeast=amapManager._map.getBounds().northeast
						self.southwest =amapManager._map.getBounds().southwest
// 						console.log(self.northeast)
// 						console.log(self.southwest)
	
					},
					init:(o)=>{
						self.northeast = o.getBounds().northeast
						self.southwest = o.getBounds().southwest 
						self.getzhoubian()

// 						console.log(self.northeast)
// 						console.log(self.southwest)
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

	.amap-demo {
		height: 400px;
	}

	.el-vue-search-box-container {
		width: 100% !important;
		color: #999999;

	}

	.amap-logo {
		display: none !important;
	}

	.amap-copyright {
		display: none !important;
	}
</style>
