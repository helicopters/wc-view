<style>

.user {
  height: 150px;
  width: 150px;	
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
	
		<h1 v-for="i in 10">展位</h1>
		<!-- 页面显示的图片 -->
		<div class="box">
			<img :src="url" v-for="(url,key) in imgList" :key="key" alt="" class="user wc-preview-img" @click="fn(imgList, key)">
			
		</div>


		<div class="box">
			<img :src="url" v-for="(url,key) in imgList2" :key="key" alt="" class="user wc-preview-img" @click="fn(imgList2, key)">
			
		</div>
	
		<h1 v-for="i in 10">展位</h1>

		<div class="box">
			<img :src="url" v-for="(url,key) in imgList3" :key="key" alt="" class="user wc-preview-img" @click="fn(imgList3, key)">
			
		</div>


		<wc-view ref="view"/>


		<!-- <wc-view :list="imgList2"/> -->
	</div>
</template>
<script>
	export default {
		name: 'App',
		data () {
			return {
				imgList: ['https://bucket-zb-fanba.oss-cn-hangzhou.aliyuncs.com/4b4c9042e3754101ae11d4d97882cbc1.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2214b22.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2220UG.jpg','http://t10.baidu.com/it/u=1863417261,812716211&fm=173&s=FAA0804142D83674D72CC59D0300D083&w=640&h=359&img.JPEG','http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/0D/0F/ChMkJlnJyEKIaQO_AM-mbhQo89QAAgyrABQofAAz6aG651.jpg','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/d9f865e0174e4092b26499b47d44b034.jpeg','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/414e4a3196f14ede92be5ec8a5923a28.jpeg'],



				imgList2: ['http://t10.baidu.com/it/u=1863417261,812716211&fm=173&s=FAA0804142D83674D72CC59D0300D083&w=640&h=359&img.JPEG','http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/0D/0F/ChMkJlnJyEKIaQO_AM-mbhQo89QAAgyrABQofAAz6aG651.jpg','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/d9f865e0174e4092b26499b47d44b034.jpeg','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/414e4a3196f14ede92be5ec8a5923a28.jpeg'],


				imgList3: ['https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/0b5fe28ad6d444e3a5f5589e3392292a.png','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/c3f69a83fb5d4d108849eae1ec2453b0.jpeg','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/bdbf458697b5416ea2177c97645683a7.jpeg','https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/4807bdcc522a4c378f680085e816889f.jpeg'],




			}
		},
		mounted () {
			// console.log(this.$refs.view)
		},
		methods: {
			fn (list, key) {
				// console.log(this, this.$event)
				this.$refs.view.open(list, key);
			}

		}
	}
</script>