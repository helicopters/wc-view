<style lang="less">
.img {
	height: 100px;
	width: 160px;
/*	padding: 20px;
	margin: 10px;*/
	z-index: 1000;
	position: relative;
	transform-origin: left top;
	transition: all 333ms;
	
	/* 不允许用户自己定义这个玩意. 如果定义, 结果自己负责. */
	
}
.box {
	
	
	
	
	
	
	
	
	
	
	
	
	
	position: fixed;
	top:0;
	right: 0;
	bottom: 0;
	left: 0;
	background: black;
	z-index: 1000;
	opacity: 0;
	display: none;
	transition: all 333ms;
}
.box-show {
	display: block;
}
.box-diff {
	
	opacity: 1;
}

.bb {
	height: 200px;
	width: 200px;
}
.cc {
	height: 100px;
	width: 150px;
}
.aa {
	height: 300px;
	width: 222px;
}




.wc-swiper {
	// position: absolute!important;
	// top:0;
	// bottom: 0;
	// left: 0;
	// right: 0;
	// background: red;
	// display: flex;
	// align-items:center;
	// position: fixed!important;
	// background: black;
	z-index: 100001!important;
	height: 100%;
}

.shishi {
	width: 100%;
	z-index: 1000000!important;
	position: relative;
}

.wc-slide {
	// position: absolute!important;
	// top:0;
	// bottom: 0;
	// left: 0;
	// right: 0;
	// background: red;
	display: flex;
	align-items:center;	
}


</style>
<template>
	<div class="container">




		<h1 v-for="i in 19">ff</h1>

		<img :src="url" v-for="(url,key) in imgList" :key="key" alt="" class="img">


		<p>11222</p>
		<h1 v-for="i in 19">ff</h1>
		<div class="box">
			

		<wc-swiper class="wc-swiper" :autoplay="false" v-if="showSwiper" :defaultSlide="xxx">
			<wc-slide v-for="(value, key) in imgList" class="wc-slide">
				<img :src="value" alt="" class="shishi">
			</wc-slide>
		</wc-swiper>
			


		</div>
	</div>
</template>
<script>
	export default {
		name: 'App',
		data () {
			return {
				xxx: 0,
				showSwiper: false,
				width: 0,
				height: 0,
				naturalHeight: 0,
				naturalWidth: 0,
				show: false,
				position: '',
				zIndex: '',
				left: 0,
				top: 0,
				current: null,
				imgList: ['https://bucket-zb-fanba.oss-cn-hangzhou.aliyuncs.com/4b4c9042e3754101ae11d4d97882cbc1.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2214b22.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2220UG.jpg','http://t10.baidu.com/it/u=1863417261,812716211&fm=173&s=FAA0804142D83674D72CC59D0300D083&w=640&h=359&img.JPEG']
			}
		},
		mounted () {


			
			/* 显示 box */
			let showBox = () => {
				/* 因为渲染的问题, 所以最好在 onload 结束, 其实就是异步*/
				let box = document.querySelector('.box');
				
				box.classList.add('box-show');
				setTimeout(()=>{
					box.classList.add('box-diff')
					// this.showSwiper = true;
				}, 50);
			}



			let setImg = (img) => {
				this.position = getComputedStyle(img).position;
				this.zIndex = getComputedStyle(img).zIndex;
				
				img.style.zIndex = 100000;

				if (this.position == 'static') {
					img.style.position = 'relative';
				}				
			}


			let getScale = (img) => {

				let imgWidth = img.width;
				let screenWidth = document.documentElement.clientWidth;
				let realWidth = img.naturalWidth;
				let radio = 0;
				if (realWidth < screenWidth) {
					
					
					radio = 1;
				} else {
					radio = screenWidth/imgWidth;
				}	
				return radio;
			}



			


			function toArray(like) {
				console.log(like)
				return Array.prototype.slice.call(like);
			}
				
			toArray(document.querySelectorAll('.img'))
				.forEach((el,index)=>{
					el.index = index;

					console.log(el)


			el.onload = () => {

				el.addEventListener('click', (e)=>{



					/* 首先要改变 box 的状态*/
						
					showBox();

					/* 然后设置 img 的属性 */

					setImg(e.target);


					/* 然后开始计算放大比例*/
					let radio = getScale(e.target);

					// console.log(radio*el.height);

					var aa = el.naturalHeight/(el.naturalWidth/document.documentElement.clientWidth);

					let br = aa/el.height;

					console.log(br);

					// el.style.height = 





					/* 以及设置元素的 translateY 值*/

					let top = e.target.getBoundingClientRect().top;

					let left = e.target.getBoundingClientRect().left;

					
					let diff = document.documentElement.clientHeight - aa;
					let half = diff/2;
					
					if (Math.abs(top) == Math.abs(half)) {
						
						return;
					} else {
						
						
						
						let end = Math.abs(top) - Math.abs(half);
						
						
						
						if (top>0){
							end = -end;
						} else {
							end = Math.abs(top) + Math.abs(half)
						}	

						e.target.style.left = 0;
						e.target.style.transform = 'translate(' + (-left) + 'px,' + (end) + 'px) scale(' + radio + ',' + br + ')';	

						this.current = e.target;		
					}


					let tend = ()=>{

						
						this.showSwiper = true;
						el.style.zIndex = this.zIndex;


						// console.log(el.index)
						this.xxx = el.index;



					}

					el.addEventListener('transitionend', tend, false)

					
					
					
					
					

				}, false);
			}











				})

			


			// let img = document.querySelector('.img');











			
			let box = document.querySelector('.box');
			box.addEventListener('click', ()=>{
				
				/* 先将mask 给干掉 */
				box.classList.remove('box-diff');
				let handler = ()=>{
					box.classList.remove('box-show');
					box.removeEventListener('transitionend', handler, false);
				}
				box.addEventListener('transitionend', handler, false);
				
				this.current.style.transform = 'scale(1)';
				
				
				this.current.style.zIndex = this.zIndex;
				this.current.style.position = this.position;
			}, false);












		}
	}
</script>