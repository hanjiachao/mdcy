<script>
	import common from '@/utils/common'
	export default {
		onLaunch: function() {
			common.ajax({
				url: 'Index/getShareContent',
				success: res => {
					common.setShareInfo({
						imageUrl: res.share_image,
						title: res.share_title
					})
				}
			})
		}
	}
</script>

<style>
	page{background: #eaecf3}
	view{font-size: 24rpx;color: #3e3e3e}
	image,video{display: block}
	.input-placeholder,.textarea-placeholder{color: #c2c2c2}
	.overflow{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;word-break: break-all}
</style>
