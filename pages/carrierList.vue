<template>
	<view>
		<view class="headerContent">
			<view class="header">
				<picker class="picker" :range="typeList" @change="changeType">
					<image class="logo" :src="`../static/map${typeIndex + 1}.png`" mode="widthFix"></image>
					<view class="text">{{typeList[typeIndex]}}</view>
					<image class="icon" src="../static/down.png" mode="widthFix"></image>
				</picker>
				<view class="search">
					<input type="text" placeholder="请输入关键字搜索" v-model="search" @confirm="refreshList">
					<image src="../static/search.png" mode="widthFix"></image>
				</view>
				<navigator class="tabBtn" url="carrier" open-type="switchTab" hover-class="none">
					<image class="icon" src="../static/map.png" mode="widthFix"></image>
				</navigator>
			</view>
			<view class="filters">
				<picker class="picker" :class="typeIndex != 1 || 'block'" :range="pickerList1" range-key="ca_name" @change="changePicker1">
					<view class="text">{{pickerIndex1 ? pickerList1[pickerIndex1].ca_name : titleList[typeIndex][0]}}</view>
					<image class="icon" src="../static/downW.png" mode="widthFix"></image>
				</picker>
				<picker class="picker" :range="pickerList2" range-key="ca_name" @change="changePicker2" v-if="typeIndex != 1">
					<view class="text">{{pickerIndex2 ? pickerList2[pickerIndex2].ca_name : titleList[typeIndex][1]}}</view>
					<image class="icon" src="../static/downW.png" mode="widthFix"></image>
				</picker>
			</view>
		</view>
		<view class="list">
			<navigator class="item" :url="`carrierDetail?id=${item.sp_id}`" v-for="(item,index) in list" :key="index">
				<image class="img" :src="item.sp_image"></image>
				<view class="info">
					<view class="title overflow">{{item.sp_title}}</view>
					<view class="text overflow">{{item.sp_description}}</view>
					<view class="tag">{{item.land_name ? item.land_name : ''}}</view>
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
				typeList: ['空间载体','楼宇','园区'],
				typeIndex: 0,
				pickerList1: [],
				pickerIndex1: 0,
				pickerList2: [],
				pickerIndex2: 0,
				pickerAll: [{ca_id: '',ca_name: '全部'}],
				pickerData: '',
				params: '',
				titleList: [['面积','出让性质'],['可用面积','价格'],['规划面积','招商方向']],
				search: '',
				list: [],
				page: 0,
				limit: 10,
				refresh: true
			}
		},
		onLoad(options) {
			this.typeIndex = parseInt(options.index)
			this.getPicker()
			this.getList()
		},
		onReachBottom() {
			if(this.refresh){
				this.getList()
			}
		},
		methods: {
			getList(){
				this.getParams()
				common.ajax({
					url: 'Index/getSpaceList',
					data: this.params,
					success: res => {
						let list = res.list
						this.list = this.page ? this.list.concat(list) : list
						this.page = this.page + 1
						this.refresh = list.length == this.limit
						uni.setNavigationBarTitle({title: `${this.typeList[this.typeIndex]}列表`})
					}
				})
			},
			getPicker() {
				common.ajax({
					url: 'Index/getSpaceCate',
					showLoading: false,
					success: res => {
						this.pickerData = res.list
						this.refreshPicker()
					}
				})
			},
			getParams(){
				let params = {
					skey: this.search,
					type: this.typeList[this.typeIndex],
					page: this.page,
					limit: this.limit
				}
				let pickerList1 = this.pickerList1
				let pickerList2 = this.pickerList2
				let pickerIndex1 = this.pickerIndex1
				let pickerIndex2 = this.pickerIndex2
				switch (this.typeIndex){
					case 0: 
						params.area = pickerIndex1 ? pickerList1[pickerIndex1].ca_name : '';
						params.land_name = pickerIndex2 ? pickerList2[pickerIndex2].ca_name : '';break;
					case 1: 
						params.area = pickerIndex1 ? pickerList1[pickerIndex1].ca_name : '';
						params.price = pickerIndex2 ? pickerList2[pickerIndex2].ca_name : '';break;
					case 2:
						params.area = pickerIndex1 ? pickerList1[pickerIndex1].ca_name : '';
						params.project_name = pickerIndex2 ? pickerList2[pickerIndex2].ca_name : '';break;
				}
				this.params = params
			},
			refreshPicker(){
				let data = this.pickerData
				let list1 = []
				let list2 = []
				switch (this.typeIndex){
					case 0: list1 = data.area;list2 = data.land;break;
					case 1: list1 = data.usable_area;list2 = data.price;break;
					case 2: list1 = data.planning_area;list2 = data.introduced_project;break;
				}
				this.pickerList1 = this.pickerAll.concat(list1)
				this.pickerList2 = this.pickerAll.concat(list2)
				this.pickerIndex1 = 0
				this.pickerIndex2 = 0
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
				this.refreshPicker()
			},
			changePicker1(e){
				this.pickerIndex1 = parseInt(e.detail.value)
				this.refreshList()
			},
			changePicker2(e){
				this.pickerIndex2 = parseInt(e.detail.value)
				this.refreshList()
			}
		}
	}
</script>

<style lang="less">
	.headerContent{
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
		background: #eaecf3;
		.header{
			padding: 20rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.picker{
				width: 195rpx;
				line-height: 75rpx;
				padding: 0 25rpx;
				background: #fff;
				border-radius: 13rpx;
				position: relative;
				box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
				.logo{
					width: 35rpx;
					height: 35rpx;
					position: absolute;
					left: 20rpx;
					top: 20rpx;
				}
				.text{
					font-size: 28rpx;
					text-indent: 50rpx;
				}
				.icon{
					width: 18rpx;
					position: absolute;
					right: 25rpx;
					top: 34rpx;
				}
			}
			.search{
				width: 290rpx;
				padding: 0 25rpx;
				margin: 0 24rpx;
				background: #fff;
				border-radius: 13rpx;
				box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
				display: flex;
				justify-content: space-around;
				align-items: center;
				input{
					width: 290rpx;
					height: 75rpx;
					line-height: 75rpx;
					font-size: 28rpx;
				}
				image{
					width: 36rpx;
					height: 36rpx;
				}
			}
			.tabBtn{
				width: 75rpx;
				height: 75rpx;
				border-radius: 13rpx;
				box-shadow: 0 2rpx 16rpx 0 rgba(22, 140, 234, 0.89);
				background: #0986E9;
				display: flex;
				justify-content: center;
				align-items: center;
				.icon{
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
		.filters{
			margin: 0 25rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;
			.picker{
				width: 290rpx;
				line-height: 65rpx;
				padding: 0 25rpx;
				background: #A4B4C0;
				border-radius: 13rpx;
				position: relative;
				box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
				&.block{width: 650rpx}
				.text{
					font-size: 28rpx;
					color: #fff;
				}
				.icon{
					width: 18rpx;
					position: absolute;
					right: 25rpx;
					top: 29rpx;
				}
			}
		}
	}
	.list{
		padding-top: 200rpx;
		margin: 0 25rpx;
		.item{
			height: 210rpx;
			padding: 0 15rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 13rpx;
			background: #fff;
			margin-bottom: 25rpx;
			.img{
				width: 180rpx;
				height: 180rpx;
				border-radius: 13rpx;
			}
			.info{
				width: 470rpx;
				.title{
					font-size: 28rpx;
					line-height: 40rpx;
					font-weight: bold;
				}
				.text{
					color: #3e3e3e;
					line-height: 40rpx;
					margin: 5rpx 0 30rpx;
				}
				.tag{
					line-height: 38rpx;
					border-radius: 7rpx;
					background: #0986E9;
					padding: 0 10rpx;
					display: inline-block;
					color: #fff;
				}
			}
		}
	}
</style>
