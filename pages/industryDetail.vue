<template>
	<view v-if="showPage">
		<block v-if="!isCulture">
			<map class="map" :latitude="lat" :longitude="lon" scale="10" :markers="markers" :polygons="polygons" @callouttap="goDetail" v-if="navIndex != 2">
				<cover-view class="header" @click="switchPicker">
					<cover-view class="picker">
						<cover-view class="text">{{info.ca_name}}</cover-view>
						<cover-image class="icon" src="../static/down.png" mode="widthFix"></cover-image>
					</cover-view>
				</cover-view>
				<cover-view class="pickerContent" v-if="showPicker">
					<!-- <cover-view class="title">{{cateTitle}}</cover-view> -->
					<cover-view class="list">
						<navigator class="item" :url="`industryDetail?id=${item.ca_id}`" open-type="redirect" hover-class="none" v-for="(item,index) in cateList" :key="index">
							<cover-image class="icon" :src="imgUrl + item.ca_icon" mode="aspectFit"></cover-image>
							<cover-view class="text">{{item.ca_name}}</cover-view>
						</navigator>
					</cover-view>
				</cover-view>
			</map>
			<!-- <map class="map" latitude="39" longitude="105" scale="3" :markers="markers" :polygons="polygons" @callouttap="goImportant" v-else> -->
			<map class="map" :latitude="lat" :longitude="lon" scale="10" :markers="markers" :polygons="polygons" @callouttap="goImportant" v-else>
				<cover-view class="header" @click="switchPicker">
					<cover-view class="picker">
						<cover-view class="text">{{info.ca_name}}</cover-view>
						<cover-image class="icon" src="../static/down.png" mode="widthFix"></cover-image>
					</cover-view>
				</cover-view>
				<cover-view class="pickerContent" v-if="showPicker">
					<!-- <cover-view class="title">{{cateTitle}}</cover-view> -->
					<cover-view class="list">
						<navigator class="item" :url="`industryDetail?id=${item.ca_id}`" open-type="redirect" hover-class="none" v-for="(item,index) in cateList" :key="index">
							<cover-image class="icon" :src="imgUrl + item.ca_icon" mode="aspectFit"></cover-image>
							<cover-view class="text">{{item.ca_name}}</cover-view>
						</navigator>
					</cover-view>
				</cover-view>
			</map>
		</block>
		<view class="map" v-else>
			<swiper class="swiper" indicator-dots autoplay circular indicator-color="#fff" indicator-active-color="#0986E9">
				<swiper-item class="swiperItem" v-for="(item,index) in info.ca_picture" :key="index">
					<image :src="imgUrl + item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<cover-view class="header" @click="switchPicker">
				<cover-view class="picker">
					<cover-view class="text">{{info.ca_name}}</cover-view>
					<cover-image class="icon" src="../static/down.png" mode="widthFix"></cover-image>
				</cover-view>
			</cover-view>
			<cover-view class="pickerContent" v-if="showPicker">
				<!-- <cover-view class="title">{{cateTitle}}</cover-view> -->
				<cover-view class="list">
					<navigator class="item" :url="`industryDetail?id=${item.ca_id}`" open-type="redirect" hover-class="none" v-for="(item,index) in cateList" :key="index">
						<cover-image class="icon" :src="imgUrl + item.ca_icon" mode="widthFix"></cover-image>
						<cover-view class="text">{{item.ca_name}}</cover-view>
					</navigator>
				</cover-view>
			</cover-view>
		</view>
		<view class="contentBox">
			<view class="navList">
				<view class="navItem" :class="navIndex != index || 'active'" v-for="(item,index) in navList" :key="index" @click="changeNav(index)">{{item}}</view>
			</view>
			<view class="navContent" v-if="!isCulture">
				<view class="content1" v-if="navIndex == 0">
					<rich-text :nodes="richText"></rich-text>
				</view>
				<view class="content2" v-if="navIndex == 1">
					<view class="tabList">
						<view class="item" :class="tabIndex != index || 'active'" v-for="(item,index) in tabList" :key="index" @click="changeTab(index)">{{item}}</view>
					</view>
					<view class="industryContent" v-for="(item,index) in industryList" :key="index" v-if="item.company_list.length">
						<view class="title">{{item.ca_name}}</view>
						<view class="companyList">
							<!-- <navigator class="item" :url="`companyDetail?id=${lItem.co_id}`" hover-class="active" v-for="(lItem,lIndex) in item.company_list" :key="lIndex">
								<view class="icon">
									<image src="../static/company.png"></image>
								</view>
								<view class="text overflow">{{lItem.co_name}}</view>
							</navigator> -->
							<view class="item" hover-class="active" v-for="(lItem,lIndex) in item.company_list" :key="lIndex" @click="setCompanyPosition(lItem)">
								<view class="icon">
									<image src="../static/company.png"></image>
								</view>
								<view class="text overflow">{{lItem.co_name}}</view>
							</view>
						</view>
						<!-- <view class="industryList" v-else>
							<navigator class="item" :url="`companyDetail?id=${lItem.co_id}`" hover-class="active" v-for="(lItem,lIndex) in item.list" :key="lIndex">{{lItem.co_name}}</navigator>
						</view> -->
					</view>
				</view>
				<view class="content3" v-if="navIndex == 3">
					<view class="companyList">
						<navigator class="item" :url="`importantDetail?id=${item.co_id}`" hover-class="active" v-for="(item,index) in companyList" :key="index">
							<view class="icon">
								<image src="../static/company.png"></image>
							</view>
							<view class="text overflow">{{item.co_name}}</view>
						</navigator>
					</view>
				</view>
				<view class="content4" v-if="navIndex == 2">
					<view class="companyList">
						<navigator class="item" :url="`leadingDetail?id=${item.co_id}`" hover-class="active" v-for="(item,index) in companyList" :key="index">
							<view class="icon">
								<image src="../static/company.png"></image>
							</view>
							<view class="text overflow">{{item.co_name}}</view>
						</navigator>
					</view>
				</view>
			</view>
			<view class="navContent" v-else>
				<view class="content1" v-if="navIndex == index" v-for="(item,index) in richTextList" :key="index">
					<rich-text :nodes="item"></rich-text>
				</view>
			</view>
			<view class="fixContent" v-if="showPass">
				<view class="confirm">
					<view class="title">请输入授权码</view>
					<input class="password" type="password" placeholder="请输入授权码" placeholder-style="color: #fff" v-model="password"/>
					<view class="btns">
						<view class="btn" @click="confirmPass">确认</view>
						<view class="btn" @click="hideConfirm">取消</view>
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
				lat: common.getLat(),
				lon: common.getLon(),
				imgUrl: '',
				id: '',
				navList: [],
				navIndex: 0,
				tabList: ['创新链','产业链','服务链'],
				tabIndex: 0,
				info: '',
				industryList: [],
				companyList: [],
				cateTitle: '',
				cateList: [],
				password: '',
				pass: false,
				showPass: false,
				showPicker: false,
				richText: '',
				richTextList: [],
				marker: common.getMarker(),
				markers: [],
				polygons: [],
				isCulture: false,
				showPage: false
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
			this.getNav()
		},
		onShareAppMessage() {
			return common.getShareInfo()
		},
		methods: {
			getNav(){
				common.ajax({
					url: 'Index/getIndustryCateSelect',
					data: {
						ca_id: this.id
					},
					success: res => {
						this.imgUrl = res.app
						this.cateList = res.list
					}
				})
			},
			getDetail(){
				common.ajax({
					url: 'Index/getIndustryCateDetail',
					data: {
						ca_id: this.id
					},
					success: res => {
						let info = res.list
						uni.setNavigationBarTitle({title: info.ca_name})
						let isCulture = info.ca_type == '文旅产业'
						this.isCulture = isCulture
						if(isCulture){
							this.navList = ['发展现状','发展方向','景区简介']
							this.getCulture()
						}else{
							this.navList = ['产业现状','产业结构','龙头企业','招商重点']
							this.info = info
							this.richText = common.getRichText(info.ca_content)
							this.imgUrl = res.app
							this.showPage = true
							let list = res.structure
							let polygons = [{
								points: res.geography.ca_content,
								fillColor: '#3fffff50',
								strokeColor: "#FFF",
								strokeWidth: 1
							}]
							let markers = []
							list.map((item,index) => {
								let marker = JSON.parse(JSON.stringify(this.marker))
								marker.id = item.co_id
								marker.latitude = item.co_lat
								marker.longitude = item.co_lng
								marker.callout.content = item.co_name
								markers.push(marker)
							})
							this.polygons = polygons
							this.markers = markers
							this.companyList = list
						}
					}
				})
			},
			getCulture(){
				common.ajax({
					url: 'Index/getBrigadeCateDetail',
					data: {
						ca_id: this.id
					},
					success: res => {
						let info = res.list
						let list = []
						uni.setNavigationBarTitle({title: info.ca_name})
						list.push(common.getRichText(info.ca_content))
						list.push(common.getRichText(info.ca_develop))
						list.push(common.getRichText(info.ca_scenic))
						this.info = info
						this.richTextList = list
						this.imgUrl = res.app
						this.showPage = true
					}
				})
			},
			getStructure(){
				common.ajax({
					url: 'Index/getIndustryStructure',
					data: {
						ca_id: this.id,
						type: this.tabList[this.tabIndex]
					},
					success: res => {
						let list = res.list
						let tabIndex = this.tabIndex
						let markers = []
						list.map((item,index) => {
							item.company_list.map((item,index) => {
								let marker = JSON.parse(JSON.stringify(this.marker))
								marker.id = item.co_id
								marker.latitude = item.co_lat
								marker.longitude = item.co_lng
								marker.callout.content = `${item.co_name}\r\n地址:${item.co_address}`
								// marker.callout.textAlign = 'center'
								markers.push(marker)
							})
						})
						this.markers = markers
						this.industryList = list
					}
				})
			},
			getCompany(){
				let navList = this.navList
				let navIndex = this.navIndex
				let type = navList[navIndex]
				common.ajax({
					url: 'Index/getCompanyList',
					data: {
						ca_id: this.id,
						type: type
					},
					success: res => {
						let list = res.list
						let markers = []
						list.map((item,index) => {
							let marker = JSON.parse(JSON.stringify(this.marker))
							marker.id = item.co_id
							marker.latitude = item.co_lat
							marker.longitude = item.co_lng
							marker.callout.content = item.co_name
							markers.push(marker)
						})
						this.markers = markers
						this.companyList = list
					}
				})
			},
			getPicker(){
				common.ajax({
					url: 'Index/getIndustryCategetCompanyAllList',
					data: {
						ca_id: this.id
					},
					success: res => {
						let data = res.list
						let list = []
						list.push({title: '科研院所',list: data.fist_list})
						list.push({title: '大学',list: data.second_list})
						list.push({title: '科技企业',list: data.third_list})
						this.industryList = list
					}
				})
			},
			setCompanyPosition(child){
				this.lat = child.co_lat
				this.lon = child.co_lng
				let markers = this.markers
				markers.map((item,index) => {
					let marker = markers[index]
					if(child.co_id == item.id){
						marker.iconPath = '../static/position3.png'
						marker.callout.display = 'ALWAYS'
						marker.callout.bgColor = '#ed9629'
					}else{
						marker.iconPath = '../static/position1.png'
						marker.callout.display = 'BYCLICK'
						marker.callout.bgColor = '#0986e9'
					}
					this.$set(this.markers,index,marker)
				})
			},
			goDetail(e){
				if(this.navIndex == 1){
					return false
				}
				let id = e.detail.markerId
				uni.navigateTo({
					url: `leadingDetail?id=${id}`
				})
			},
			goImportant(e){
				let id = e.detail.markerId
				uni.navigateTo({
					url: `importantDetail?id=${id}`
				})
			},
			switchPicker(){
				this.showPicker = !this.showPicker
			},
			refreshPosition(){
				this.lat = common.getLat()
				this.lon = common.getLon()
			},
			changeNav(index){
				this.refreshPosition()
				if(index == 3 && !this.pass && !this.isCulture){
					this.showPass = true
					return false
				}
				this.navIndex = index
				if(index == 0){
					this.getDetail()
				}
				if(index == 1){
					this.getStructure()
				}
				if(index > 1){
					this.refreshCompany()
				}
			},
			confirmPass(){
				if(this.password == this.info.ca_pass){
					this.pass = true
					this.changeNav(3)
				}else{
					common.toast('验证失败')
				}
				this.hideConfirm()
			},
			refreshCompany(){
				this.page = 0
				this.companyList = []
				this.refresh = true
				this.getCompany()
			},
			changeTab(index){
				this.tabIndex = index
				this.industryList = []
				this.refreshPosition()
				this.getStructure()
			},
			hideConfirm(){
				this.password = ''
				this.showPass = false
			}
		}
	}
</script>

<style lang="less">
	.map{
		width: 750rpx;
		height: 540rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}
	.swiper{
		height: 540rpx;
		.swiperItem{
			image{
				width: 100%;
				height: 540rpx;
			}
		}
	}
	.header{
		position: fixed;
		width: 100%;
		height: 100rpx;
		left: 0;
		top: 0;
		&.showBtn{
			.picker{
				width: 535rpx !important;
			}
		}
		.picker{
			position: absolute;
			width: 635rpx;
			height: 75rpx;
			padding: 0 25rpx;
			left: 30rpx;
			top: 25rpx;
			background: #fff;
			border-radius: 13rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 5rpx 0 rgba(0, 0, 0, 0.35);
			.text{
				width: 580rpx;
				height: 75rpx;
				line-height: 75rpx;
				font-size: 28rpx;
				color: #3e3e3e;
			}
			.icon{
				width: 18rpx;
				height: 11rpx;
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
		.title{
			font-size: 28rpx;
			line-height: 85rpx;
			color: #242424;
			font-weight: bold;
			padding: 0 32rpx;
		}
		.list{
			padding-top: 30rpx;
			padding-bottom: 10rpx;
			min-height: 180rpx;
			max-height: 380rpx;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			overflow-y: scroll;
			.item{
				width: 25%;
				margin-bottom: 30rpx;
				.icon{
					width: 77rpx;
					height: 77rpx;
					margin: 0 auto;
				}
				.text{
					width: 80%;
					margin: 25rpx auto 0;
					line-height: 34rpx;
					color: #4c4c4c;
					font-weight: bold;
					text-align: center;
					white-space: normal;
				}
			}
		}
	}
	.contentBox{
		padding-top: 540rpx;
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
		.content1{
			padding: 30rpx;
			background: #fff;
		}
		.content2{
			padding-bottom: 10rpx;
			.tabList{
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				padding: 30rpx;
				.item{
					width: 205rpx;
					line-height: 65rpx;
					background: #A4B4C0;
					border-radius: 13rpx;
					text-align: center;
					font-size: 28rpx;
					color: #fff;
					&.active{background: #0986E9}
				}
			}
			.industryContent{
				margin: 30rpx;
				padding: 25rpx 30rpx 35rpx;
				background: #fff;
				border-radius: 13rpx;
				.title{
					font-size: 28rpx;
					line-height: 50rpx;
					margin-bottom: 10rpx;
					font-weight: bold;
					color: #0986E9;
				}
				.industryList{
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					.item{
						color: #3E3E3E;
						line-height: 40rpx;
						text-decoration: underline;
						margin-right: 50rpx;
						&.active{color: #0986E9}
					}
				}
			}
		}
		.content2 .companyList{padding: 0 !important}
		.content2,.content3,.content4{
			.companyList{
				padding: 35rpx 30rpx;
				background: #fff;
				.item{
					margin-bottom: 12rpx;
					border-radius: 13rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1rpx solid #B6B8C1;
					overflow: hidden;
					box-sizing: border-box;
					&.active{
						background: #0986E9;
						.icon{background: #0986E9}
						.text{color: #fff}
					}
					.icon{
						width: 90rpx;
						height: 65rpx;
						background: #A4B4C0;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 40rpx;
							height: 35rpx;
						}
					}
					.text{
						width: calc(100% - 90rpx);
						line-height: 65rpx;
						color: #3e3e3e;
						text-indent: 30rpx;
					}
				}
			}
		}
	}
	.fixContent{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		.confirm{
			background: #ebedf4;
			border-radius: 13rpx;
			width: 590rpx;
			overflow: hidden;
			.title{
				font-size: 28rpx;
				line-height: 120rpx;
				text-align: center;
				color: #0986E9;
				font-weight: bold;
			}
			.password{
				margin: 65rpx auto 90rpx;
				border-radius: 13rpx;
				width: 480rpx;
				padding: 0 20rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: #d2d9e2;
				color: #fff;
			}
			.btns{
				display: flex;
				justify-content: center;
				align-items: center;
				.btn{
					width: 50%;
					line-height: 90rpx;
					font-weight: bold;
					font-size: 28rpx;
					text-align: center;
					&:nth-child(1){
						background: #0986E9;
						color: #fff;
					}
				}
			}
		}
	}
</style>
