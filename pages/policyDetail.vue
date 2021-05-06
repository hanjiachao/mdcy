<template>
	<view>
		<view class="header">
			<view class="title">政策详情</view>
			<button class="share" open-type="share">
				<image class="icon" src="../static/share.png" mode="widthFix"></image>
			</button>
		</view>
		<view class="article">
			<view class="title">{{info.po_title}}</view>
			<view class="date">{{info.add_time}}</view>
			<rich-text :nodes="info.po_content"></rich-text>
		</view>
		<view class="contentTitle" v-if="list.length">相关政策推送</view>
		<view class="list">
			<navigator :url="`policyDetail?id=${item.po_id}`" open-type="redirect" class="item" hover-class="active" v-for="(item,index) in list" :key="index">
				<view class="title">{{item.po_title}}</view>
				<view class="info">
					<view>发文单位：{{item.po_author}}</view>
					<view>{{item.add_time}}</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import common from '@/utils/common'
	export default {
		data() {
			return {
				id: '',
				info: '',
				list: [],
				richText: '',
				shareTitle: '',
				shareImg: ''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		// onShareAppMessage() {
		// 	return{
		// 		imageUrl: '/static/logo.jpg',
		// 		title: '北辰区产业招商地图',
		// 		path: `/pages/policyDetail?id=${this.id}`
		// 	}
		// },
		methods: {
			getDetail(){
				common.ajax({
					url: 'Index/getPolicyDetail',
					data: {
						po_id: this.id
					},
					success: res => {
						let info = res.info
						this.info = info
						this.richText = common.getRichText(info.po_content)
						this.list = res.policy_list
						this.shareTitle = res.share_title
						this.shareImg = res.share_image
					}
				})
			}
		},
		onShareAppMessage() {
			return {
				title: this.shareTitle || this.info.po_title,
				imageUrl: this.shareImg
			}
		}
	}
</script>

<style lang="less">
	page{padding-bottom: 30rpx}
	.header{
		display: flex;
		justify-content: center;
		align-items: center;
		.title{
			width: 600rpx;
			line-height: 85rpx;
			background: #D1D4DE;
			font-size: 28rpx;
			text-indent: 32rpx;
		}
		.share{
			width: 150rpx;
			height: 85rpx;
			background: #168CEA;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 0;
			.icon{
				width: 90rpx;
				height: 90rpx;
			}
		}
	}
	.article{
		padding: 40rpx 30rpx 20rpx;
		background: #fff;
		.title{
			font-size: 28rpx;
			font-weight: bold;
		}
		.date{
			line-height: 30rpx;
			margin: 20rpx 0;
		}
	}
	.contentTitle{
		margin-top: 15rpx;
		position: relative;
		font-size: 36rpx;
		color: #242424;
		font-weight: bold;
		text-indent: 55rpx;
		line-height: 112rpx;
		&:before{
			content: '';
			width: 6rpx;
			height: 36rpx;
			border-radius: 3rpx;
			background: #0986E9;
			position: absolute;
			left: 30rpx;
			top: 39rpx;
		}
	}
	.list{
		margin: 0 20rpx;
		.item{
			margin-bottom: 25rpx;
			padding: 25rpx 35rpx 30rpx;
			background: #fff;
			border-radius: 13rpx;
			position: relative;
			overflow: hidden;
			&:before{
				content: '';
				position: absolute;
				width: 10rpx;
				height: 100%;
				left: 0;
				top: 0;
				background: #0986E9;
			}
			&.active{
				background: #0986E9;
				view{color: #fff !important}
			}
			.title{
				width: 580rpx;
				font-size: 28rpx;
				line-height: 36rpx;
				font-weight: bold;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.info{
				margin-top: 25rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				& > view{
					line-height: 30rpx;
					color: #3e3e3e;
				}
			}
		}
	}
</style>
