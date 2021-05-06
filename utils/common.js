// const ajaxUrl = 'http://mande.haozhicheng.weyoui.cn/index.php/Home/'
const ajaxUrl = 'https://www.ydbase.com/index.php/Home/'
const mapLat = 39.275339
const mapLon = 117.173544
let shareInfo = {
	imageUrl: '/static/logo.jpg',
	title: '北辰区产业招商地图',
}

export default class common {
	static ajax(params) {
		let showLoading = typeof params.showLoading == 'boolean' ? params.showLoading : true
		let sendToken = typeof params.sendToken == 'boolean' ? params.sendToken : true
		let timeout = 5000
		let timer = setTimeout(() => {
			common.toast('网络超时')
			request.abort()
		}, timeout)
		if (showLoading || showLoading && params.loadingText) {
			common.loading(params.loadingText)
		}
		let data = params.data || {}
		let token = uni.getStorageSync('token')
		if(token && sendToken){
			data.token = token
		}
		uni.request({
			url: ajaxUrl + params.url,
			method: params.type || 'post',
			data: data,
			header: {'content-type': 'application/x-www-form-urlencoded'},
			success: res => {
				uni.hideLoading()
				if(params.success){
					if(res.data.code == 401){
						uni.setStorageSync('token','')
					}
					params.success(res.data.result)
				}
			},
			fail: res => {
				uni.hideLoading()
				if(params.fail){
					params.fail(res.data.result)
				}
			},
			complete: res => {
				clearTimeout(timer)
				uni.stopPullDownRefresh()
				if(params.complete){
					params.complete(res.data.result)
				}
			}
		})
	}

	static getLat() {
		return mapLat
	}
	
	static getLon() {
		return mapLon
	}
	
	static getMarker() {
		return {
			latitude: '',
			longitude: '',
			iconPath: '../static/position1.png',
			width: '48rpx',
			height: '72rpx',
			callout: {
				content: '',
				color: '#fff',
				bgColor: '#0986e9',
				fontSize: '22rpx',
				padding: '6rpx'
			}
		}
	}
	
	static getRichText(content) {
		const regex = new RegExp('<img', 'gi')
		content = content.replace(regex, `<img style="max-width: 100%;height: auto"`)
		return content
	}
	
	static setShareInfo(info) {
		shareInfo = info
	}
	
	static getShareInfo() {
		return shareInfo
	}

	static toast(title, icon) {
		uni.showToast({
			title: title ? title.toString() : '',
			icon: icon || 'none'
		})
	}
	
	static loading(title) {
		uni.showLoading({
			title: title ? title.toString() : '加载中...'
		})
	}
}