<template>
	<view>
		<map class="map" :latitude="info.co_lat" :longitude="info.co_lng" :markers="markers" v-if="showMap"></map>
		<view class="content">
			<view class="title">{{info.co_name}}</view>
			<rich-text :nodes="richText"></rich-text>
		</view>
	</view>
</template>

<script>
	import common from '@/utils/common'
	export default {
		data() {
			return {
				info: '',
				markers: [],
				marker: common.getMarker(),
				showMap: false,
				richText: ''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		methods: {
			getDetail() {
				common.ajax({
					url: 'Index/getCompanyDetail',
					data: {
						co_id: this.id
					},
					success: res => {
						let info = res.list
						this.info = info
						this.richText = common.getRichText(info.co_content)
						let marker = this.marker
						marker.latitude = info.co_lat
						marker.longitude = info.co_lng
						marker.callout.content = info.co_name
						this.markers[0] = marker
						this.showMap = true
					}
				})
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
	.content {
		padding: 580rpx 30rpx 30rpx;
		background: #fff;
		.title {
			font-size: 28rpx;
			line-height: 40rpx;
			margin-bottom: 20rpx;
			font-weight: bold;
		}
	}
</style>
