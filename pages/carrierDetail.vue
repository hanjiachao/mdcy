<template>
	<view v-if="showPage">
		<swiper class="swiper" indicator-dots autoplay circular indicator-color="#fff" indicator-active-color="#0986E9">
			<swiper-item class="swiperItem" v-for="(item,index) in info.sp_picture" :key="index">
				<image :src="imgUrl + item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="contentTitle">
			<span>{{info.sp_title}}</span>
			<view class="tag">{{info.sp_land_name}}</view>
		</view>
		<view class="navList">
			<view class="navItem" :class="navIndex != index || 'active'" v-for="(item,index) in navList" :key="index" @click="changeNav(index)">{{index != 1 ? info.sp_type : ''}}{{item}}</view>
		</view>
		<view class="navContent">
			<view class="content1" v-if="navIndex == 0">
				<view class="table">
					<block v-if="info.sp_type == '空间载体'">
						<!-- <view class="row"><view>地块序号</view><view>{{info.sp_number}}</view></view> -->
						<view class="row"><view>地块名称</view><view>{{info.sp_title}}</view></view>
						<view class="row"><view>土地面积</view><view>{{parseFloat(info.sp_area)}}m²</view></view>
						<view class="row"><view>出让性质</view><view>{{info.sp_land_name}}</view></view>
						<!-- <view class="row"></view>基础设施</view><view>{{info.sp_infrastructure}}</view></view> -->
						<!-- <view class="row"><view>产业定位</view><view>{{info.sp_industry_location}}</view></view> -->
						<view class="row"><view>招商方向</view><view>{{info.sp_investment_direction}}</view></view>
					</block>
					<block v-if="info.sp_type == '楼宇'">
						<!-- <view class="row"><view>序号</view><view>{{info.sp_number}}</view></view> -->
						<view class="row"><view>属地</view><view>{{info.sp_region_name}}</view></view>
						<view class="row"><view>楼宇名称</view><view>{{info.sp_title}}</view></view>
						<view class="row"><view>具体地址</view><view>{{info.sp_address}}</view></view>
						<view class="row"><view>总面积</view><view>{{parseFloat(info.sp_count_area)}}m²</view></view>
						<view class="row"><view>可用面积</view><view>{{parseFloat(info.sp_area)}}m²</view></view>
						<!-- <view class="row"><view>具体规格</view><view>{{info.sp_infrastructure}}</view></view> -->
						<!-- <view class="row"><view>招商定位</view><view>{{info.sp_industry_location}}</view></view> -->
						<!-- <view class="row"><view>合作方式</view><view>{{info.sp_investment_direction}}</view></view> -->
						<!-- <view class="row"><view>价格</view><view>{{info.sp_price}}</view></view> -->
						<!-- <view class="row"><view>物业费</view><view>{{info.sp_property_fee}}</view></view> -->
						<!-- <view class="row"><view>周边配套</view><view>{{info.sp_check_company}}</view></view> -->
					</block>
					<block v-if="info.sp_type == '园区'">
						<view class="row"><view>园区名称</view><view>{{info.sp_title}}</view></view>
						<view class="row"><view>园区简介</view><view>{{info.sp_description}}</view></view>
						<view class="row"><view>园区位置</view><view>{{info.sp_address}}</view></view>
						<view class="row"><view>园区规划</view><view>{{info.sp_infrastructure}}</view></view>
						<view class="row"><view>园区面积</view><view>{{parseFloat(info.sp_area)}}m²</view></view>
						<view class="row"><view>园区定位</view><view>{{info.sp_industry_location}}</view></view>
						<view class="row"><view>入驻企业</view><view>{{info.sp_check_company}}</view></view>
						<view class="row"><view>招商方向</view><view>{{info.sp_investment_direction}}</view></view>
						<view class="row"><view>服务形式</view><view>{{info.sp_service_form}}</view></view>
						<view class="row"><view>园区政策</view><view>{{info.sp_park_policy}}</view></view>
					</block>
				</view>
			</view>
			<view class="content2" v-if="navIndex == 1">
				<view class="companyList">
					<image class="bg" src="../static/companyTitle.png" mode="widthFix"></image>
					<navigator :url="`companyDetail?id=${item.co_id}`" hover-class="none" class="item" v-for="(item,index) in companyList" :key="index">{{item.co_name}}</navigator>
				</view>
			</view>
			<view class="content3" v-if="navIndex == 2">
				<view class="resourseList">
					<view class="item" :class="!item.status || 'active'" v-for="(item,index) in resourseList" :key="index">
						<image class="icon" :src="`../static/r${index + 1}${item.status ? 'a' : ''}.png`" mode="widthFix"></image>
						<view class="title">{{item.title}}</view>
						<view class="tag">{{item.status ? '有' : '无'}}</view>
					</view>
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
				id: '',
				navList: ['概况','明星企业','资源'],
				navIndex: 0,
				info: '',
				resourseList: [],
				companyList: [],
				page: 0,
				limit: 10,
				refresh: true,
				showPage: false
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
			this.getCompany()
		},
		onReachBottom() {
			if(this.navIndex == 1 && this.refresh){
				this.getList()
			}
		},
		methods: {
			getDetail(){
				common.ajax({
					url: 'Index/getSpaceDetail',
					data: {
						sp_id: this.id
					},
					success: res => {
						let info = res.info
						let list = []
						list.push({title: '独立行政许可中心',status: this.getStatus(info.sp_administration_center)})
						list.push({title: '医院',status: this.getStatus(info.sp_hospital)})
						list.push({title: '幼儿园',status: this.getStatus(info.sp_kindergarten)})
						list.push({title: '小学',status: this.getStatus(info.sp_primary_school)})
						list.push({title: '文体设施',status: this.getStatus(info.sp_style_facilities)})
						list.push({title: '银行',status: this.getStatus(info.sp_bank)})
						list.push({title: '地铁',status: this.getStatus(info.sp_subway)})
						list.push({title: '空港',status: this.getStatus(info.sp_airport)})
						list.push({title: '养老机构',status: this.getStatus(info.sp_pension_agency)})
						list.push({title: '商业网点',status: this.getStatus(info.sp_commercial_outlets)})
						list.push({title: '休闲娱乐场所',status: this.getStatus(info.sp_leisure_place)})
						list.push({title: '海港',status: this.getStatus(info.sp_harbour)})
						uni.setNavigationBarTitle({title: `${info.sp_type}详情`})
						this.info = info
						this.resourseList = list
						this.imgUrl = res.app
						this.showPage = true
					}
				})
			},
			getCompany(){
				common.ajax({
					url: 'Index/getSpaceCompanyList',
					data: {
						sp_id: this.id,
						page: this.page,
						limit: this.limit
					},
					success: res => {
						let list = res.list
						this.companyList = this.page ? this.companyList.concat(list) : list
						this.page = this.page + 1
						this.refresh = list.length == this.limit
					}
				})
			},
			changeNav(index){
				this.navIndex = index
			},
			getStatus(value){
				return value == '有'
			}
		}
	}
</script>

<style lang="less">
	.swiper{
		height: 540rpx;
		.swiperItem{
			image{
				width: 100%;
				height: 540rpx;
			}
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
		position: relative;
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
		.tag{
			background: #0986E9;
			padding: 0 10rpx;
			border-radius: 7rpx;
			color: #fff;
			position: absolute;
			top: 39rpx;
			right: 30rpx;
			line-height: 38rpx;
			text-indent: 0;
			font-weight: normal;
		}
	}
	.navList{
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		position: relative;
		background: #fff;
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
	.navContent{
		padding: 40rpx 30rpx;
		background: #fff;
		.content1{
			.table{
				.row{
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					& > view{
						padding: 15rpx 0;
						font-size: 28rpx;
						line-height: 35rpx;
						min-height: 35rpx;
					}
					&:nth-child(odd){
						background: #0974C9;
						& > view:nth-child(2){background: #D0E7FA}
					}
					&:nth-child(even){
						background: #0986E9;
						& > view:nth-child(2){background: #F2F9FF}
					}
					&:nth-child(1){
						& > view:nth-child(2){
							background: #0986E9;
							color: #fff;
						}
					}
					& > view:nth-child(1){
						width: 30%;
						color: #fff;
					}
					& > view:nth-child(2){
						width: calc(70% - 30rpx);
						padding: 15rpx;
						color: #262D43;
					}
				}
			}
		}
		.content2{
			.companyList{
				width: 510rpx;
				padding: 90rpx 0 35rpx;
				margin: 25rpx auto 0;
				position: relative;
				border: 2rpx solid #b4daf8;
				.bg{
					width: 400rpx;
					position: absolute;
					left: 55rpx;
					top: -29rpx;
				}
				.item{
					color: #3e3e3e;
					line-height: 40rpx;
					text-align: center;
					padding: 0 20rpx;
				}
			}
		}
		.content3{
			.resourseList{
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				.item{
					width: 30%;
					padding: 20rpx;
					margin: 0 1.66% 40rpx;
					border-radius: 13rpx;
					box-sizing: border-box;
					background: #A9B8C4;
					&.active{
						background: #178DEA;
						.tag{background: #4ea8ef}
					}
					.icon{
						width: 75rpx;
						height: 75rpx;
					}
					.title{
						color: #fff;
						font-weight: bold;
						margin: 12rpx 0;
						padding: 0 4rpx;
						line-height: 35rpx;
						height: 70rpx;
					}
					.tag{
						font-size: 16rpx;
						line-height: 30rpx;
						background: #bec9d2;
						color: #fff;
						display: inline-block;
						padding: 0 12rpx;
						margin-left: 4rpx;
						border-radius: 7rpx;
					}
				}
			}
		}
	}
</style>
