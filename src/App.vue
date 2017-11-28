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

.xie {
	height: 150px;
	width: 150px;
	background-position: center center;

	background-size:cover;
	display: inline-block;
	/*float: left;*/
}	
</style>
<template>
	<div class="container">

			

		<h1>背景图模式 </h1>

		<div class="xie" v-for="(url, key) in imgList" :key="key"  @click="$preview($event, imgList, key)" :style="{'backgroundImage': 'url(' + url + ')'}">
			
		</div>

		
		<h1>img 标签 帖子1</h1>
		<div class="box">
			<img :src="url" v-for="(url,key) in imgList" :key="key" alt="" class="user wc-preview-img" @click="$preview($event, imgList, key)">
			
		</div>

		<h2>img 标签 帖子2</h2>
		<div class="box">
			<img :src="url" v-for="(url,key) in imgList2" :key="key" alt="" class="user wc-preview-img" @click="$preview($event, imgList2, key)">
			
		</div>

	</div>
</template>
<script>
	export default {
		name: 'App',
		data () {
			return {
				imgList: ['https://bucket-zb-fanba.oss-cn-hangzhou.aliyuncs.com/4b4c9042e3754101ae11d4d97882cbc1.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2214b22.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2220UG.jpg','http://t10.baidu.com/it/u=1863417261,812716211&fm=173&s=FAA0804142D83674D72CC59D0300D083&w=640&h=359&img.JPEG','http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/0D/0F/ChMkJlnJyEKIaQO_AM-mbhQo89QAAgyrABQofAAz6aG651.jpg'],



				imgList2: ['http://t10.baidu.com/it/u=1863417261,812716211&fm=173&s=FAA0804142D83674D72CC59D0300D083&w=640&h=359&img.JPEG','http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/0D/0F/ChMkJlnJyEKIaQO_AM-mbhQo89QAAgyrABQofAAz6aG651.jpg'],





			}
		},
		mounted () {
			// console.log(this.$refs.view)
		},
		methods: {
			fn (e,list, key) {
				// console.log(this, this.$event)
				this.$refs.view.open(e,list, key);
			}

		}
	}
</script>