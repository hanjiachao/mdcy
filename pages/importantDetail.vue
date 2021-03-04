<template>
	<view v-if="showPage">
		<map class="map" :latitude="info.co_lat" :longitude="info.co_lng" :markers="markers" v-if="showMap"></map>
		<view class="contentBox">
			<view class="content">
				<view class="title">{{info.co_name}}</view>
				<rich-text :nodes="richText"></rich-text>
			</view>
			<view class="companyList">
				<view class="item" v-for="(item,index) in companyList" :key="index" v-if="index == 0">
					<view class="header">
						<image class="icon" src="../static/companyB.png" mode="widthFix"></image>
						<view class="text overflow">{{item.co_name}}</view>
					</view>
					<view class="info">
						<view class="row">
							<view class="title">简介</view>
							<view class="text">{{item.co_description}}</view>
						</view>
						<view class="row">
							<view class="title">主要产品/资质</view>
							<view class="text">{{item.co_qualification}}</view>
						</view>
						<view class="row">
							<view class="title">所在地</view>
							<view class="text">{{item.co_address}}</view>
						</view>
						<view class="row">
							<view class="title">备注</view>
							<view class="text">{{item.co_remark}}</view>
						</view>
					</view>
				</view>
				<!-- <view class="item" v-for="(item,index) in companyList" :key="index" @click="switchInfo(index)">
					<view class="header">
						<image class="icon" src="../static/companyB.png" mode="widthFix"></image>
						<view class="text overflow">{{item.co_name}}</view>
						<image class="arrow" src="../static/down.png" mode="widthFix"></image>
					</view>
					<view class="info" v-if="item.active && item.info">
						<view class="row">
							<view class="title">简介</view>
							<view class="text">{{item.info.co_description}}</view>
						</view>
						<view class="row">
							<view class="title">主要产品/资质</view>
							<view class="text">{{item.info.co_qualification}}</view>
						</view>
						<view class="row">
							<view class="title">所在地</view>
							<view class="text">{{item.info.co_address}}</view>
						</view>
						<view class="row">
							<view class="title">备注</view>
							<view class="text">{{item.info.co_remark}}</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import common from '@/utils/common'
	export default {
		data() {
			return {
				caId: '',
				id: '',
				info: '',
				markers: [],
				marker: common.getMarker(),
				showMap: false,
				companyList: [],
				richText: '',
				isCulture: false,
				showPage: false
			}
		},
		onLoad(options) {
			this.caId = options.caId
			this.id = options.id
			// this.getDetail()
			// this.getList()
			this.getInfo()
		},
		methods: {
			// getDetail() {
			// 	common.ajax({
			// 		url: 'Index/getCompanyDetail',
			// 		data: {
			// 			co_id: this.id
			// 		},
			// 		success: res => {
			// 			let info = res.list
			// 			this.info = info
			// 			this.richText = common.getRichText(info.co_content)
			// 			let marker = this.marker
			// 			marker.latitude = info.co_lat
			// 			marker.longitude = info.co_lng
			// 			marker.callout.content = info.co_name
			// 			this.markers[0] = marker
			// 			this.showMap = true
			// 			this.getInfo()
			// 		}
			// 	})
			// },
			// getList(){
			// 	common.ajax({
			// 		url: 'Index/getCompanyAllList',
			// 		data: {
			// 			ca_id: this.caId,
			// 			type: '招商重点'
			// 		},
			// 		success: res => {
			// 			let list = res.list
			// 			for(let i = 0;i < list.length;i++){
			// 				list[i].active = false
			// 			}
			// 			this.companyList = list
			// 			this.switchInfo(0)
			// 		}
			// 	})
			// },
			getInfo(){
				common.ajax({
					url: 'Index/getCompanyAllDetail',
					data: {
						co_id: this.id
					},
					success: res => {
						// this.$set(this.companyList[0],'info',res.list)
						let info = res.list
						let marker = this.marker
						this.richText = common.getRichText(info.co_content)
						marker.latitude = info.co_lat
						marker.longitude = info.co_lng
						marker.callout.content = info.co_name
						this.info = info
						this.markers[0] = marker
						this.showMap = true
						this.$set(this.companyList,0,info)
						this.showPage = true
					}
				})
			},
			switchInfo(index){
				let item = this.companyList[index]
				let active = item.active
				this.$set(this.companyList[index],'active',!active)
				if(!active){
					this.getInfo(item.co_id,index)
				}
			}
		}
	}
</script>

<style lang="less">
	.map {
		width: 750rpx;
		height: 540rpx;
		position: fixed;
		left: 0;
		top: 0;
	}
	.contentBox{
		padding-top: 540rpx;
	}
	.content {
		padding: 40rpx 30rpx;
		background: #fff;
		.title {
			font-size: 28rpx;
			line-height: 40rpx;
			margin-bottom: 20rpx;
			font-weight: bold;
		}
	}
	.companyList{
		margin: 40rpx 30rpx;
		padding-bottom: 30rpx;
		.item{
			line-height: 90rpx;
			padding: 0 25rpx;
			margin-bottom: 12rpx;
			border-radius: 13rpx;
			background: #fff;
			.header{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.icon{
					width: 40rpx;
					height: 35rpx;
				}
				.text{
					width: calc(100% - 60rpx);
					font-size: 28rpx;
					color: #3e3e3e;
				}
				.arrow{
					width: 18rpx;
					height: 11rpx;
				}
			}
			.info{
				padding-bottom: 15rpx;
				.row{
					padding: 0 30rpx 20rpx;
					&:nth-child(1) .title:before{background: #0986E9}
					&:nth-child(2) .title:before{background: #34C271}
					&:nth-child(3) .title:before{background: #ED9626}
					&:nth-child(4) .title:before{background: #F2414D}
					.title{
						font-weight: bold;
						color: #3E3E3E;
						line-height: 70rpx;
						position: relative;
						&:before{
							content: '';
							display: block;
							position: absolute;
							width: 8rpx;
							height: 8rpx;
							border-radius: 50%;
							top: 31rpx;
							left: -28rpx;
						}
					}
					.text{
						color: #A1A2A2;
						line-height: 35rpx;
					}
				}
			}
		}
	}
</style>
