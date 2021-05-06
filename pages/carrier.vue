<template>
	<view>
		<map :latitude="lat" :longitude="lon" scale="10" :markers="markers" :polygons="polygons" subkey="I5YBZ-UL36J-422FH-FCDYE-AMEHV-RLB2R" :layer-style="btnIndex == -1 ? 1 : (btnIndex + 1)" :enable-3D="true" @callouttap="goDetail">
			<cover-view class="header" :class="btnIndex == -1 || 'showBtn'">
				<cover-view class="picker" @click="switchPicker">
					<cover-view class="text" :class="pickerIndex || 'gray'">{{pickerIndex ? pickerList[pickerIndex].ca_name : '请选择想要了解的载体'}}</cover-view>
					<cover-image class="icon" src="../static/down.png"></cover-image>
				</cover-view>
				<navigator :url="`carrierList?index=${btnIndex}`" hover-class="none">
					<cover-view class="tabBtn" v-if="btnIndex > -1">
						<cover-image class="icon" src="../static/list.png" mode="widthFix"></cover-image>
					</cover-view>
				</navigator>
			</cover-view>
			<cover-view class="btns">
				<cover-view class="btn" :class="btnIndex != index || 'active'" v-for="(item,index) in btnList" :key="index" @click="changeBtn(index)">
					<cover-image class="icon" :src="`../static/map${index + 1}${btnIndex == index ? 'a' : ''}.png`"></cover-image>
					<cover-view class="title">{{item}}</cover-view>
				</cover-view>
			</cover-view>
			<cover-view class="pickerContent" :class="btnIndex == -1 || 'showBtn'" v-if="showPicker">
				<cover-view class="title">{{cateTitle}}</cover-view>
				<cover-view class="list">
					<cover-view class="item" v-for="(item,index) in pickerList" :key="index" @click="changePicker(index)">{{item.ca_name}}</cover-view>
				</cover-view>
			</cover-view>
			<cover-view class="typeList">
				<cover-view class="typeItem" v-for="(item,index) in btnList" :key="index">
					<cover-image class="icon" :src="`../static/position${index + 1}.png`"></cover-image>
					<cover-view class="title">{{item}}</cover-view>
				</cover-view>
			</cover-view>
		</map>
	</view>
</template>

<script>
	import common from '@/utils/common'
	export default {
		data() {
			return {
				lat: common.getLat(),
				lon: common.getLon(),
				pickerList: [{ca_name: '全部','ca_id': ''}],
				pickerIndex: 0,
				markers: [],
				marker: common.getMarker(),
				btnList: ['空间载体', '楼宇', '园区'],
				btnIndex: -1,
				styleList: ['#0986e9','#34c271','#ed9626'],
				polygons: [],
				showPicker: false
			}
		},
		onLoad() {
			this.getPicker()
			this.getMap()
		},
		onShareAppMessage() {
			return common.getShareInfo()
		},
		methods: {
			getPicker() {
				common.ajax({
					url: 'Index/getSpaceCate',
					showLoading: false,
					success: res => {
						this.pickerList = this.pickerList.concat(res.list.address)
					}
				})
			},
			getMap() {
				common.ajax({
					url: 'Index/getSpaceAllList',
					data: {
						region_name: this.pickerIndex ? this.pickerList[this.pickerIndex].ca_name : '',
						type: this.btnIndex > -1 ? this.btnList[this.btnIndex] : ''
					},
					success: res => {
						let list = res.list
						let styleList = this.styleList
						let polygons = [{
							points: res.map.ca_content,
							fillColor: '#3fffff50',
							strokeColor: "#FFF",
							strokeWidth: 1
						}]
						let markers = []
						list.map((item,index) => {
							let marker = JSON.parse(JSON.stringify(this.marker))
							let styleIndex = this.getType(item.sp_type)
							marker.id = item.sp_id
							marker.latitude = item.sp_lat
							marker.longitude = item.sp_lng
							marker.iconPath = `../static/position${styleIndex + 1}.png`
							marker.callout.content = item.sp_title
							marker.callout.bgColor = styleList[styleIndex]
							markers.push(marker)
						})
						this.markers = markers
						this.polygons = polygons
					}
				})
			},
			getType(type) {
				let list = this.btnList
				let styleIndex = ''
				list.map((item,index) => {
					if(type == item){
						styleIndex = index
					}
				})
				return styleIndex
			},
			goDetail(e) {
				let id = e.detail.markerId
				uni.navigateTo({
					url: `carrierDetail?id=${id}`
				})
			},
			changeBtn(index) {
				this.btnIndex = index == this.btnIndex ? -1 : index
				this.getMap()
			},
			changePicker(index) {
				this.pickerIndex = index
				this.showPicker = false
				this.getMap()
			},
			switchPicker() {
				this.showPicker = !this.showPicker
			}
		}
	}
</script>

<style lang="less">
	map {
		position: fixed;
		width: 750rpx;
		height: 100%;
	}
	.header {
		position: fixed;
		width: 100%;
		height: 100rpx;
		left: 0;
		top: 0;
		&.showBtn {
			.picker{width: 535rpx !important}
		}
		.picker {
			position: absolute;
			width: 635rpx;
			padding: 0 25rpx;
			left: 30rpx;
			top: 25rpx;
			background: #fff;
			border-radius: 13rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
			.text {
				width: 580rpx;
				height: 75rpx;
				line-height: 75rpx;
				font-size: 28rpx;
				color: #3e3e3e;
				&.gray{color: #c2c2c2}
			}
			.icon {width: 18rpx}
		}
		.tabBtn {
			position: absolute;
			width: 75rpx;
			height: 75rpx;
			right: 30rpx;
			top: 25rpx;
			border-radius: 13rpx;
			box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon {
				width: 36rpx;
				height: 30rpx;
			}
		}
	}
	.btns {
		position: fixed;
		left: 30rpx;
		top: 125rpx;
		width: 85rpx;
		.btn {
			width: 85rpx;
			height: 85rpx;
			box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
			background: #fff;
			border-radius: 13rpx;
			margin-bottom: 20rpx;
			&.active {
				background: #0986E9;
				color: #fff;
			}
			.icon {
				width: 36rpx;
				height: 36rpx;
				margin: 14rpx auto 8rpx;
			}
			.title {
				font-size: 16rpx;
				font-weight: bold;
				text-align: center;
			}
		}
	}
	.pickerContent{
		position: fixed;
		width: 684rpx;
		left: 31rpx;
		top: 102rpx;
		background: #fff;
		box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
		border-radius: 13rpx;
		&.showBtn{width: 585rpx !important}
		.title{
			font-size: 28rpx;
			line-height: 85rpx;
			color: #242424;
			font-weight: bold;
			padding: 0 32rpx;
		}
		.list{
			padding: 20rpx 10rpx 10rpx;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.item{
				width: 44%;
				margin: 0 3%;
				line-height: 48rpx;
				border-radius: 24rpx;
				text-align: center;
				background: #a4b4c0;
				color: #fff;
				margin-bottom: 14rpx;
			}
		}
	}
	.typeList{
		position: fixed;
		right: 30rpx;
		bottom: 30rpx;
		background: #fff;
		border-radius: 8rpx;
		padding: 0 10rpx 5rpx;
		.typeItem{
			margin-top: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon{
				width: 32rpx;
				height: 50rpx;
			}
			.title{
				width: 120rpx;
				line-height: 50rpx;
				text-align: center;
			}
		}
	}
</style>
