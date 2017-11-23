<style lang="less">
.box {
	position: fixed;
	top:0;
	right: 0;
	bottom: 0;
	left: 0;
	background: black;
	/* 图片浏览器容器的 z-index 为 10*/
	// z-index: 9000;
	opacity: 0;
	display: none;
	// transition: all 300ms;

  will-change: opacity;
  /* for open/close transition */
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); 

  transform: translateZ(0);
  // -webkit-backface-visibility: hidden;
}
.box-show {
	display: block;
}
.box-diff {
	opacity: 1;
}
.img {
	height: 100px;
	width: 160px;
/*	padding: 20px;
	margin: 10px;*/
	// z-index: 1000;
	// position: relative;
	transform-origin: left top;


  -webkit-transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1); 


	// transition: all 300ms;
	/* 不允许用户自己定义这个玩意. 如果定义, 结果自己负责. */
}
// .bb {
// 	height: 200px;
// 	width: 200px;
// }
// .cc {
// 	height: 100px;
// 	width: 150px;
// }
// .aa {
// 	height: 300px;
// 	width: 222px;
// }
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
	// z-index: 100001!important;
	height: 100%;
	// z-index: 10000!important;
}
.shishi {
	width: 100%;
	// z-index: 1000000!important;
	// position: relative;
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
		<!-- 页面显示的图片 -->
		<img :src="url" v-for="(url,key) in imgList" :key="key" alt="" class="img">
		<!-- 图片浏览器容器 -->
		<div class="box">
			<wc-swiper ref="swiper" class="wc-swiper" :autoplay="false" v-if="showSwiper" :defaultSlide="curSlide" @transitionend="transitionend">
				<wc-slide v-for="(value, key) in imgList" class="wc-slide" :key="key">
					<img :src="value" alt="" class="shishi">
				</wc-slide>
			</wc-swiper>
		</div>
	</div>
</template>
<script>
	function toArray(like) {
		return Array.prototype.slice.call(like);
	}
	export default {
		name: 'App',
		data () {
			return {
				curIndex: -1,
				imgsPropertyMap: {},
				docHeight: '',
				docWidth: '',
				xRadio: 0,
				yRadio: 0,
				/* 这个是图片最终显示的大小 */
				xHeight: 0,
				/* 控制元素距离顶部的距离*/
				y: '',
				x: '',
				/* 当前是谁 */
				current: null,
				curSlide: 0,
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
				property: {},
				endStatus: {},
				size: {},
				box: null,
				imgList: ['https://bucket-zb-fanba.oss-cn-hangzhou.aliyuncs.com/4b4c9042e3754101ae11d4d97882cbc1.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2214b22.jpg','http://www.nvsay.com/uploads/allimg/161108/172-16110R2220UG.jpg','http://t10.baidu.com/it/u=1863417261,812716211&fm=173&s=FAA0804142D83674D72CC59D0300D083&w=640&h=359&img.JPEG']
			}
		},
		mounted () {
			/* 获取当前屏幕的高度和宽度, 后面计算 scale 需要用到 */
			this.getDocSize();
			// this.initImgBrowser();


			this.imgBindLoadEv();

			
		},


/*
首先为所有的img绑定 onload 事件. 然后点击的时候, 如果图片没有 onload 成功, 不响应点击事件; 

然后为所有的图片绑定点击事件. 



*/


		methods: {

			imgBindLoadEv () {

				this.imgs = toArray(document.querySelectorAll('.img'));

				this.imgs.forEach((img, index) => {

					img.onload = () => {

						img.index = index;
						// img.loadStatus = true;


						/* 收集所有的图片的属性信息, 因为这些属性需要重置 */
						this.property[index] = this.getProperty(img);

						/* 拿到所有的图片的显示大小, 真实大小*/
						this.size[index] = this.getSzie(img);

						/* 计算出所有的图片的终点状态*/
						this.endStatus[index] = this.calEndStatus(img);




						img.addEventListener('click', this.clickEv, false);



					}


				});



			},

			clickEv (e) {

				// this.imgs.forEach((img, index)=>{
				// 	this.recover(img, index)
				// })





				this.current = e.target;
				this.curIndex = this.current.index;



				// this.$ref.swiper.slideTo(this.curIndex);

				// console.log(this.curIndex);


				console.log(this.curIndex,'当前显示第几个')



				// console.log(this.endStatus)



				this.showBox();


				/* 设置当前显示元素的属性 */
				this.current.style.zIndex = 1000;
				this.current.style.position = 'relative';
				// // this.current.style.backgroundColor = 'yellow'





				// this.current.style.transitionDuration = '300ms'
				this.transform(this.current, this.endStatus[this.curIndex]);

				/* 

					为 img 绑定 transitionend 事件

				*/

				let transitionend = () => {
					/*显示 swiper */
					this.showSwiper = true;
					/* 设置默认slide */


					this.curSlide = this.curIndex;



					/* 将容器的 zindex 设置成最高*/
					this.box.style.zIndex = 2000;

					// this.$refs.swiper.slideTo(this.curSlide)
					// console.log(this.$refs.swiper,'fdsfads')


					// console.log(this.curIndex,'hahahhahah ')

					
					/* 还要把当前显示的图片的属性再重置回去*/
					// this.recover(this.current, this.curIndex);

					this.current.removeEventListener('transitionend', transitionend, false);


				}

				this.current.addEventListener('transitionend', transitionend, false);









				
			},

			recover (img, index) {
				img.style.zIndex = this.property[index].zIndex;
				img.style.position = this.property[index].position;
			}, 

			showBox () {

				/* 因为渲染的问题, 所以最好在 onload 结束, 其实就是异步*/
				this.box = document.querySelector('.box');
				this.box.classList.add('box-show');
				setTimeout(()=>{
					this.box.classList.add('box-diff');

					this.box.addEventListener('click', this.boxClick, false);



					// this.box.addEventListener('transitionend', this.boxEnd, false);


				}, 50);		


			},

			// boxEnd () {

			// 	/* 让这个玩意层级比图片高, 就能显示出来swiper */
			// 	this.box.style.zIndex = 9000;
			// 	this.box.removeEventListener('transitionend', this.boxEnd, false);
			// 	console.log('boxend');
			// 	this.box.addEventListener('click', this.boxClick, false )





			// },
			boxClick () {


				this.showSwiper = false;

				this.box.style.zIndex = 'auto';


				this.box.classList.remove('box-diff');

				let boxHide = ()=> {
					this.box.classList.remove('box-show');
					this.box.removeEventListener('transitionend', boxHide, false);

				}
				this.box.addEventListener('transitionend', boxHide, false);

				this.current.style.transform = 'scale(1)';

				// this.current
				let imgHide = () => {
					// this.current
					this.recover(this.current, this.curIndex);
					this.current.removeEventListener('transitionend', imgHide, false);
				}
				this.current.addEventListener('transitionend', imgHide, false);




				// console.log('点击 box, 要消失了')



				// // /* 先干掉 swiper */
				// // this.showSwiper = false;

				// // this.current.style.transitionDuration = '333ms';
				// // // this.recover(this.current, this.curIndex);
				// this.current.style.transform = 'scale(1)';

				// // this.box.style.zIndex = 'auto';





				// this.box.addEventListener('transitionend', this.boxHide, false);


				/* 再继续放大*/
				// this.transform(this.current, this.endStatus[this.curIndex]);


				/* 再让图片恢复原来的样式 */

				// 

				 // 然后恢复原来的大小 




				 // setTimeout(()=>{


				 // 	/* 再次重置过来*/
					// this.current.style.zIndex = 1000;
					// this.current.style.position = 'relative';


					
					// this.current.style.transitionDuration = '300ms';

					// this.current.style.transform = 'scale(1)';

					// // let handler = () => {
					// // 	console.log('每次都有我')

					// // 	this.current.removeEventListener('transitionend', handler, false);

					// // 	this.recover(this.current, this.curIndex);
					// // }

					// // this.current.addEventListener('transitionend', handler, false);



				 // },50)





			},

			// boxHide () {

			// 	// this.box.
			// 	this.box.classList.remove('box-show');


				


			// 	this.box.removeEventListener('transitionend', this.boxHide, false);
			// },

			transitionend (index) {

				// console.log('触发了吗大哥')

				// this.current.style.transitionDuration = '0ms';
				this.recover(this.current, this.curIndex);

				
				this.current.style.transform = 'scale(1)';

				// this.current.style.backgroundColor = 'red';


				/*
滑动的时候, 需要处理一下; 
原来的那张图片, 要放回到远处; 


					
				*/

				// this.current.style.display = 'none';
				// setTimeout()

/*
重新设置当前的元素,

然后模拟一下用户点击的操作, 设置该设置的;

*/

				this.current = this.imgs[index];
				this.curIndex = index;



				this.current.style.zIndex = 1000;
				this.current.style.position = 'relative';
				// // this.current.style.backgroundColor = 'yellow'





				// this.current.style.transitionDuration = '300ms'
				this.transform(this.current, this.endStatus[this.curIndex]);




			},



			transform (el, {xRadio, yRadio, xTranslate, yTranslate}) {
				el.style.transform =`translate(${xTranslate}px, ${yTranslate}px) scale(${xRadio}, ${yRadio})`; 
			},

			getProperty (img) {

				/* 主要是保存当前图片的定位, 以及 z-index 信息*/
				let m = getComputedStyle(img);

				return{
					position: m.position,
					zIndex: m.zIndex
				}
				// this.imgsPropertyMap[img.index] = {
				// 	position: m.position,
				// 	zIndex: m.zIndex
				// }
				/* 并且重置这两个属性 */
				// img.style.zIndex = 100;
				// img.style.position = 'relative';



			},

			getSzie (img) {
				return {
					displayWidth: img.width,
					displayHeight: img.height,
					naturalWidth: img.naturalWidth,
					naturalHeight: img.naturalHeight
				}
			}, 


			calEndStatus (img) {

				// console.log('我在这理')
				/* 首先计算出缩放的比例 */
				/*

					先确定图片在 img-browser 里面显示的宽度; 

					如果图片的真实宽度, 小于屏幕的宽度, 则不再方法, 按照真实的宽度进行显示
					
					如果图片的真实宽度大于屏幕的宽度, 图片的宽度需要是屏幕的宽度; 

						如果图片宽度为屏幕宽度
						查看当前的显示的宽度, 然后计算出 x 方向的缩放比例

						图片的真实宽度, 到图片显示的宽度的比例, 再将这个比例和图片的真实高度比较
						就能拿到图片在 img-browser 中显示的高度. 


				*/



				let index = img.index;

				// console.log(this.size[index].naturalWidth,'fdasfas')

				let xRadio = 0;
				let yRadio = 0;

				/* 这个值在后面还要用 */
				let height = 0;

				if (this.size[index].naturalWidth > this.docWidth) {
					xRadio = parseFloat(this.docWidth /this.size[index].displayWidth);
					// console.log('x 方向缩放比例',xRadio);


					let radio = this.docWidth/this.size[index].naturalWidth;

					height = radio * this.size[index].naturalHeight;

					// console.log(height);

					yRadio = parseFloat(height / this.size[index].displayHeight);

					// console.log(xRadio, yRadio);



				}


				let xTranslate = 0;
				let yTranslate = 0;

				/*
					先算一下如果元素距离顶部的距离为 0 的时候, 垂直居中, y 需要偏移多少; 

					再拿到当前元素实际距离顶部的距离

					如果实际距离, 大于需要的距离. 

				*/

				// let offset = 


				let offset = ( this.docHeight - height ) / 2;
				let top = img.getBoundingClientRect().top;

				if (top < offset) {
					yTranslate = offset - top;
				} else {
					yTranslate = top - offset;
				}

				xTranslate = -img.getBoundingClientRect().left;


				return {
					xRadio: xRadio,
					yRadio: yRadio,
					xTranslate: xTranslate,
					yTranslate: yTranslate
				}

















				/* 然后计算出位移的大小 */


			},


			// imgBindClickEv () {


			// 	// if ()


			// },



			getDocSize () {
				this.docHeight = document.documentElement.clientHeight;
				this.docWidth  = document.documentElement.clientWidth;
			},
			/* 
				初始化图片浏览器
				* 拿到需要浏览的图片 DOM 对象; 
				* 为所有的图片绑定 onload 事件; 
				* 在 onload 事件里面绑定 click 事件
				img 的点击事件
				* 显示图片浏览容器; 
			*/
			// initImgBrowser () {
			// 	this.imgs = toArray(document.querySelectorAll('.img'));
			// 	this.imgs.forEach((img, index) => {
			// 		img.onload = () => {
			// 			img.index = index;
			// 			let imgClick = (e) => {
			// 				/* 设置当前是谁 */
			// 				this.current = e.target;
			// 				/* 显示图片浏览器容器 */
			// 				this.showBrowser();
			// 				/* 初始化图片的属性 */
			// 				this.initImg(e.target);
			// 				/* 计算出元素应该 scale 的信息*/
			// 				this.calScale(e.target);
			// 				/* 计算出元素的 上和左边应该有的偏移量*/
			// 				this.calTranlate(e.target);
			// 				/* 触发图片的变化*/
			// 				this.triggerTransition(e.target);
			// 				/*触发之后, 在图片变化结束之后, 瞬间将图片替换成 swiper*/
			// 			}
			// 			/* 绑定 click 事件 */
			// 			img.addEventListener('click', imgClick, false);
			// 		}
			// 	})
			// },
			// showBrowser () {
			// 	/* 因为渲染的问题, 所以最好在 onload 结束, 其实就是异步*/
			// 	let box = document.querySelector('.box');
			// 	box.classList.add('box-show');
			// 	setTimeout(()=>{
			// 		box.classList.add('box-diff');
			// 		box.addEventListener('click', this.boxClick, false);
			// 	}, 50);				
			// },
			// initImg (img) {
			// 	/* 主要是保存当前图片的定位, 以及 z-index 信息*/
			// 	let m = getComputedStyle(img);
			// 	this.imgsPropertyMap[img.index] = {
			// 		position: m.position,
			// 		zIndex: m.zIndex
			// 	}
			// 	/* 并且重置这两个属性 */
			// 	img.style.zIndex = 100;
			// 	img.style.position = 'relative';
			// },
			// calScale (img) {
			// 	/* 图片的原始尺寸*/
			// 	let naturalWidth = img.naturalWidth;
			// 	let naturalHeight = img.naturalHeight;
			// 	/* 图片的显示尺寸*/
			// 	let displayWidth = img.width;
			// 	let displayHeight = img.height;
			// 	/*
			// 		计算 x, y 的缩放比例
			// 		如果图片的原始宽度, 小于屏幕宽度, 那么最大的 x 缩放比
			// 		如果图片的原始宽度, 大于屏幕的宽度, 那么
			// 	*/
			// 	if (naturalWidth < this.docWidth) {
			// 		// this.xRadio = 
			// 	} else {
			// 		// this.xRadio = naturalWidth / this.docWidth;÷
			// 		/*
			// 			用图片的显示宽度, 和屏幕的宽度比, 得到一个 x 的缩放比例
			// 			再用图片的真实宽度, 和屏幕的宽度比, 得到另外一个缩放比例;
			// 			通过这个比例, 和元素的真实高度比较, 计算出元素的显示高度 
			// 			再拿这个高度, 和当前图片的显示高度比较, 得到一个y 的缩放比例; 
			// 		*/
			// 		this.xRadio = this.docWidth / displayWidth;
			// 		let radio = this.docWidth/naturalWidth;
			// 		this.xHeight = naturalHeight * radio;
			// 		this.yRadio = this.xHeight/displayHeight;
			// 	}
			// },
			// calTranlate (img) {
			// 	/*
			// 		先计算上面的偏移量
			// 		先假设元素距离顶部的距离为 0, 计算出如果这样元素应该偏移多少才能垂直居中:
			// 		再拿到元素距离屏幕顶部的距离
			// 		得到二者的差值, 就是还需要偏移多少距离
			// 	*/	
			// 	let offset = ( this.docHeight - this.xHeight ) / 2;
			// 	let top = img.getBoundingClientRect().top;
			// 	// this.y = top - offset
			// 	/* 如果已经距离顶部的距离, 大于垂直居中需要的距离, 说明元素需要往上移动*/
			// 	if (top < offset) {
			// 		this.y = offset - top;
			// 	} else {
			// 		this.y = top - offset;
			// 	}
			// 	this.x = -img.getBoundingClientRect().left;
			// 	// let toTop = img.getBoundingClientRect().top;
			// },
			// triggerTransition (img) {
			// 	img.style.transform = 'translate(' + this.x +   'px,' + this.y + 'px) '    + 'scale(' + this.xRadio + ',' + this.yRadio + ')';
			// 	img.addEventListener('transitionend', this.browser, false);
			// },
			// browser () {
			// 	this.curSlide = this.current.index;
			// 	this.showSwiper = true;
			// 	/* 恢复当前元素的 z-index, 以让 swiper 可以滚动*/
			// 	this.current.style.zIndex = this.imgsPropertyMap[this.curSlide].zIndex;
			// 	/* 防止重复触发, 因为恢复的时候 img 也有动画*/
			// 	this.current.removeEventListener('transitionend', this.browser, false);
			// },
			/* 监听 transitionend 事件, 及时修改 current*/
			// transitionend (index) {
			// 	/*
			// 	切换图片的时候, 实际上要让被切换出去的那张图片, 先被干掉; 不带动画的被干掉;
			// 	问题描述: 
			// 	当我们在 a 的时候, 切换到 b, 点击让 b 回去; 
			// 	*/
			// 	this.current.style.transitionDuration = '0ms';
			// 	this.current.style.transform = 'scale(1)';
			// 	this.current = this.imgs[index];
			// },
			// boxClick (e) {
			// 	// 
			// 	let box = document.querySelector('.box');
			// 		/* 先让元素不显示, 然后让页面的 zIndex 显示*/
			// 		this.showSwiper = false;
			// 		/* 初始化当前的图片 */
			// 		// this.initImg(this.current);


			// 		console.log(this.current,'当前界面')

			// 		this.current.style.transitionDuration = '333ms';

			// 		this.current.style.transform = 'scale(1)';


			// 		console.log()




			// 		// /* mask 的动画*/
			// 		box.classList.remove('box-diff');
			// 		let handler = ()=>{
			// 			// this.showSwiper = false;
			// 			box.classList.remove('box-show');
			// 			this.current.style.zIndex = this.imgsPropertyMap[this.current.index].zIndex;
			// 			this.current.style.position = this.imgsPropertyMap[this.current.index].position;
			// 			/* 不加的话, 下一次点击会发现哎 swiper 还在*/
			// 			box.removeEventListener('transitionend', handler, false);
			// 		}
			// 		box.addEventListener('transitionend', handler, false);
			// }
		}
	}
</script>