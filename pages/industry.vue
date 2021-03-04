<template>
	<view>
		<view class="banner">
			<image :src="banner" mode="widthFix"></image>
			<view class="search">
				<input type="text" placeholder="请输入关键字搜索" v-model="search" @confirm="goSearch">
				<image src="../static/search.png" mode="widthFix" @click="goSearch"></image>
			</view>
		</view>
		<view class="navContent" v-for="(item,index) in list" :key="index" v-if="item.next_list.length">
			<view class="contentTitle">{{item.ca_name}}</view>
			<view class="navBox">
				<view class="list">
					<navigator :url="`industryDetail?id=${lItem.ca_id}`" hover-class="none" class="item" v-for="(lItem,lIndex) in item.next_list" :key="lIndex">
						<image class="icon" :src="imgUrl + lItem.ca_icon" mode="aspectFit"></image>
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
				imgUrl: '',
				banner: '',
				tabList: [  
					{title: '产业发展',tip1: 'Industrial',tip2: 'Development'},
					{title: '政策汇编',tip1: 'Policy',tip2: 'Compilation'},
					{title: '载体资源',tip1: 'Carrier',tip2: 'Resources'}
				],
				list: [],
				search: ''
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				common.ajax({
					url: 'Index/getIndustryCate',
					showLoading: false,
					success: res => {
						this.imgUrl = res.app
						this.banner = res.banner
						this.list = res.list
					}
				})
			},
			changeNav1(index){
				this.navIndex1 = index
			},
			changeNav2(index){
				this.navIndex2 = index
			},
			goSearch(){
				uni.navigateTo({
					url: `industryList?search=${this.search}`
				})
			}
		}
	}
</script>

<style lang="less">
	page{padding-bottom: 40rpx}
	.banner{
		position: relative;
		padding-top: 125rpx;
		& > image{
			width: 680rpx;
			height: 380rpx;
			margin: 0 auto;
			border-radius: 13rpx;
		}
		.search{
			position: absolute;
			width: 680rpx;
			padding: 0 10rpx 0 25rpx;
			box-sizing: border-box;
			left: 35rpx;
			top: 25rpx;
			background: #fff;
			border-radius: 13rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			input{
				width: 580rpx;
				height: 75rpx;
				line-height: 75rpx;
				font-size: 28rpx;
			}
			image{
				width: 36rpx;
				height: 36rpx;
				padding: 15rpx;
			}
		}
	}
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
