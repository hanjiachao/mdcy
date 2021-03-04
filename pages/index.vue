<template>
	<view>
		<view class="banner">
			<video :src="video" autoplay loop play-btn-position="center" object-fit="cover"></video>
			<view class="search">
				<input type="text" placeholder="请输入关键字搜索" v-model="search" @confirm="goSearch">
				<image src="../static/search.png" mode="widthFix" @click="goSearch"></image>
			</view>
		</view>
		<view class="tabList">
			<navigator class="item" :url="item.url" hover-class="none" open-type="switchTab" v-for="(item,index) in tabList" :key="index">
				<image class="icon" :src="`../static/indexNav${index + 1}.png`" mode="widthFix"></image>
				<view class="title">{{item.title}}</view>
				<!-- <view class="tip">{{item.tip1}}</view> -->
				<!-- <view class="tip">{{item.tip2}}</view> -->
			</navigator>
		</view>
		<view class="navContent" v-for="(item,index) in list" :key="index" v-if="item.list.length">
			<view class="contentTitle">{{item.title}}</view>
			<view class="navBox">
				<view class="navList" v-if="item.list.length < 4">
					<view class="navItem" :class="item.index != nIndex || 'active'" v-for="(nItem,nIndex) in item.list" :key="nIndex" @click="changeIndex(index,nIndex)">{{nItem.ca_name}}</view>
				</view>
				<scroll-view class="navList" scroll-x="true" v-else>
					<view class="navItem" :class="item.index != nIndex || 'active'" v-for="(nItem,nIndex) in item.list" :key="nIndex" @click="changeIndex(index,nIndex)">{{nItem.ca_name}}</view>
				</scroll-view>
				<view class="list">
					<navigator class="item" :url="`industryDetail?id=${lItem.ca_id}`" hover-class="none" v-for="(lItem,lIndex) in item.list[item.index].next_list" :key="lIndex">
						<image class="icon" :src="imgUrl + lItem.ca_icon" mode="aspectFit"></image>
						<view class="title">{{lItem.ca_name}}</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="navContent">
			<view class="contentTitle">文旅产业</view>
			<view class="navBox">
				<view class="list">
					<navigator class="item" :url="`industryDetail?id=${lItem.ca_id}`" hover-class="none" v-for="(lItem,lIndex) in cultureList" :key="lIndex">
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
				video: '',
				tabList: [  
					{title: '产业发展',url: 'industry',tip1: 'Industrial',tip2: 'Development'},
					{title: '政策汇编',url: 'policy',tip1: 'Policy',tip2: 'Compilation'},
					{title: '载体资源',url: 'carrier',tip1: 'Carrier',tip2: 'Resources'}
				],
				list: [],
				cultureList: [],
				search: ''
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				common.ajax({
					url: 'Index/getHomeDData',
					showLoading: false,
					success: res => {
						this.video = res.video
						this.imgUrl = res.app
						let list = []
						list.push({title: '主导产业',index: 0,list: res.first_list})
						list.push({title: '赋能支撑产业',index: 0,list: res.second_list})
						this.list = list
						this.cultureList = res.third_list
					}
				})
			},
			changeIndex(index,nIndex){
				this.$set(this.list[index],'index',nIndex)
			},
			goSearch(){
				if(this.search){
					uni.navigateTo({
						url: `industryList?search=${this.search}`
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page{padding-bottom: 40rpx}
	.banner{
		position: relative;
		padding-top: 125rpx;
		& > video{
			width: 685rpx;
			height: 500rpx;
			border-radius: 13rpx;
			margin: 0 auto;
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
	.tabList{
		width: 730rpx;
		margin: 30rpx auto 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.item{
			width: 200rpx;
			padding: 40rpx 0;
			border-radius: 7rpx;
			text-align: center;
			position: relative;
			background: #fff;
			box-shadow: 0 2rpx 9rpx 0 rgba(4, 0, 0, 0.19);
			&.active{
				view{color: #fff}
			}
			.icon{
				width: 60rpx;
				height: 60rpx;
				margin: 0 auto;
			}
			.title{
				margin: 15rpx 0 5rpx;
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.tip{
				font-size: 17rpx;
				line-height: 20rpx;
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
				min-height: 180rpx;
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
