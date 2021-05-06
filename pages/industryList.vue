<template>
	<view>
		<view class="navContent" v-for="(item,index) in list" :key="index" v-if="item.next_list.length">
			<view class="contentTitle">{{item.ca_name}}</view>
			<view class="navBox">
				<view class="list">
					<navigator :url="`industryDetail?id=${lItem.ca_id}`" hover-class="none" class="item" v-for="(lItem,lIndex) in item.next_list" :key="lIndex">
						<image class="icon" :src="imgUrl + lItem.ca_icon" mode="widthFix"></image>
						<view class="title">{{lItem.ca_name}}</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '@/utils/common'
	export default {
		data() {
			return {
				search: '',
				imgUrl: '',
				list: []
			}
		},
		onLoad(options) {
			this.search = options.search
			this.getList()
		},
		onShareAppMessage() {
			let shareInfo = JSON.parse(JSON.stringify(common.getShareInfo()))
			shareInfo.path = `/pages/industryList?search=${this.search}`
			return shareInfo
		},
		methods: {
			getList(){
				common.ajax({
					url: 'Index/getIndustryCate',
					data: {
						skey: this.search
					},
					success: res => {
						let list = res.list
						this.imgUrl = res.app
						this.list = list
						if(!list.length){
							common.toast('暂无搜索结果')
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.navContent{
		margin-top: 15rpx;
		.contentTitle{
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
		.navBox{
			background: #fff;
			line-height: 80rpx;
			view.navList{
				display: flex;
				justify-content: space-between;
			}
			scroll-view.navList{
				white-space: nowrap;
				width: 100%;
			}
			.navList{
				position: relative;
				&:after{
					content: '';
					width: 100%;
					height: 2rpx;
					background: #EAECF3;
					position: absolute;
					left: 0;
					bottom: 0rpx;
				}
				.navItem{
					color: #3e3e3e;
					padding: 0 30rpx;
					display: inline-block;
					position: relative;
					&.active{
						font-size: 28rpx;
						font-weight: bold;
						&:after{
							content: '';
							width: calc(100% - 50rpx);
							height: 2rpx;
							background: #0986E9;
							position: absolute;
							left: 25rpx;
							bottom: 0;
							z-index: 1;
						}
					}
				}
			}
			.list{
				padding-bottom: 40rpx;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				.item{
					width: 185rpx;
					margin-top: 40rpx;
					.icon{
						width: 77rpx;
						height: 77rpx;
						margin: 0 auto;
					}
					.title{
						width: 130rpx;
						margin: 25rpx auto 0;
						line-height: 34rpx;
						color: #4c4c4c;
						font-weight: bold;
						text-align: center;
					}
				}
			}
		}
	}
</style>
