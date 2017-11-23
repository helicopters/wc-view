<style>

.user {
  height: 100px;
  width: 160px;	
}
.container {
	padding-top: 100px;
	padding-left: 20px;
}
.box {
	margin-bottom: 50px;
}
	
</style>
<template>
	<div class="container">

		<!-- 页面显示的图片 -->
		<div class="box">
			<img :src="url" v-for="(url,key) in imgList" :key="key" alt="" class="user wc-preview-img">
			
		</div>





		<wc-view ref="view" :list="imgList"/>


		<!-- <wc-view :list="imgList2"/> -->
	</div>
</template>
<script>
	export default {
		name: 'App',
		data () {
			return {
				imgList: ['https://bucket-zb-fanba.oss-cn-hangzhou.aliyuncs.com/4b4c9042e3754101ae11d4d97882cbc1.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2214b22.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2220UG.jpg','http://t10.baidu.com/it/u=1863417261,812716211&fm=173&s=FAA0804142D83674D72CC59D0300D083&w=640&h=359&img.JPEG','http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/0D/0F/ChMkJlnJyEKIaQO_AM-mbhQo89QAAgyrABQofAAz6aG651.jpg','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/d9f865e0174e4092b26499b47d44b034.jpeg','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/414e4a3196f14ede92be5ec8a5923a28.jpeg'],


			}
		},
		mounted () {
			// console.log(this.$refs.view)
		},
		methods: {
			fn (e, list, key) {
				console.log(e,list)
				this.$refs.view.click(e, list, key);
			},
			// fn () {
			// 	this.$refs.cao.showSwiper = true;
			// }
		}
	}
</script>