<template>
	<view>
		<view class="header">
			<picker class="picker" :range="typeList" range-key="ca_name" @change="changeType">
				<view class="text">{{typeIndex ? typeList[typeIndex].ca_name : '政策类型'}}</view>
				<image class="icon" src="../static/down.png" mode="widthFix"></image>
			</picker>
			<view class="search">
				<input type="text" placeholder="请输入关键字搜索" v-model="search" @confirm="refreshList">
				<image src="../static/search.png" mode="widthFix" @click="refreshList"></image>
			</view>
		</view>
		<view class="list">
			<navigator :url="`policyDetail?id=${item.po_id}`" class="item" hover-class="active" v-for="(item,index) in list" :key="index">
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
				typeList: [],
				typeIndex: 0,
				search: '',
				page: 0,
				limit: 10,
				refresh: true,
				list: []
			}
		},
		onLoad() {
			this.getType()
			// this.getList()
		},
		onShareAppMessage() {
			return common.getShareInfo()
		},
		onReachBottom() {
			if(this.refresh){
				this.getList()
			}
		},
		methods: {
			getList(){
				common.ajax({
					url: 'Index/getPolicyList',
					data: {
						ca_id: this.typeList[this.typeIndex].ca_id,
						skey: this.search,
						page: this.page,
						limit: this.limit
					},
					success: res => {
						let list = res.list
						this.list = this.page ? this.list.concat(list) : list
						this.page = this.page + 1
						this.refresh = list.length == this.limit
					}
				})
			},
			getType(){
				common.ajax({
					url: 'Index/getPolicyCate',
					showLoading: false,
					success: res => {
						// let list = res.list
						// list.unshift(this.typeList[0])
						this.typeList = res.list
						this.getList()
					}
				})
			},
			refreshList(){
				this.page = 0
				this.list = []
				this.refresh = true
				this.getList()
			},
			changeType(e){
				this.typeIndex = parseInt(e.detail.value)
				this.refreshList()
			}
		}
	}
</script>

<style lang="less">
	.header{
		padding: 20rpx 0 25rpx;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #eaecf3;
		z-index: 1;
		.picker{
			width: 260rpx;
			line-height: 75rpx;
			margin-right: 40rpx;
			padding: 0 25rpx;
			background: #fff;
			border-radius: 13rpx;
			position: relative;
			box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
			.text{font-size: 28rpx}
			.icon{
				width: 18rpx;
				position: absolute;
				right: 25rpx;
				top: 34rpx;
			}
		}
		.search{
			width: 340rpx;
			padding: 0 10rpx 0 25rpx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 13rpx;
			box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
			display: flex;
			justify-content: space-around;
			align-items: center;
			input{
				width: 300rpx;
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
	.list{
		padding-top: 120rpx;
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
