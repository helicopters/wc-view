<style lang="less" scoped>
.wc-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: black;
  opacity: 0;
  display: none;
  will-change: opacity;
  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
  // transform-origin: left top;
}

.wc-mask-show {
  display: block;
}

.wc-mask-diff {
  opacity: 1;
}

.wc-swiper {
  height: 100%
}

.wc-slide {
  display: flex;
  align-items: center;
}

/* 分页*/
.pagination {
	position: absolute;
	width: 100%;
	text-align: center;
	font-weight: bold;
	font-size: 18px;
	color:white;
	margin-top: 10px;
	letter-spacing: 2px;
	z-index: 10000;
}

</style>
<template>

	<!-- 图片浏览器容器 -->
	<div class="wc-mask">
		<div class="pagination">{{curSlide + 1}}/{{list.length}}</div>
		<!-- 注意这里必须用 v-if 不能用 v-show  -->
		<wc-swiper class="wc-swiper" :autoplay="false" v-if="showSwiper" :defaultSlide="curSlide" @transitionend="transitionend" :pagination="false" ref="swiper">
			<wc-slide v-for="(value, key) in list" class="wc-slide" :key="key">
				<img :src="value" alt="" width="100%">
			</wc-slide>
		</wc-swiper>
	</div>

</template>
<script>
	function toArray(like) {
		return Array.prototype.slice.call(like);
	}
	export default {
		name: 'App',
		// props: ['list'],
		data () {
			return {
				curIndex: -1,
				docHeight: '',
				docWidth: '',
				current: null,
				curSlide: 0,
				showSwiper: false,
				/* 保存img 原本的属性 */
				property: {},
				/* 保存img浏览状态下的一些值 */
				endStatus: {},
				/* 保存图片的真实大小, 显示大小 */
				size: {},
				/* 遮罩层 */
				mask: null,
				list: [],
				reallyIndex: -1,
				startIndex: -1
			}
		},
		mounted () {
			
			this.getDocSize();
			/* 为页面上的图片绑定 click 事件 */
			this.initBrowser();
		},
		methods: {
			/* 获取当前屏幕的高度和宽度, 后面计算 scale 需要用到 */
			getDocSize () {
				// this.docHeight = document.documentElement.clientHeight;
				// this.docWidth  = document.documentElement.clientWidth;
				this.docHeight = window.innerHeight;
				this.docWidth = window.innerWidth;
			},


			initBrowser () {
				/* 获取所有图片对象 */
				this.imgs = toArray(document.querySelectorAll('.wc-preview-img'));
				/* 为所有的图片对象绑定 onload 事件*/
				this.imgs.forEach((img, index) => {

					img.onload = () => {
						img.index = index;
						/* 收集所有的图片的属性信息, 因为这些属性需要重置 */
						this.property[index] = this.getProperty(img);
						/* 拿到所有的图片的显示大小, 真实大小*/
						this.size[index] = this.getSzie(img);
						/* 为图片绑定 click 事件 */
						img.addEventListener('click', this.imgClick, false);
					}
				});
			},


			/* 这玩意是给用户调用的, 主要就是做一个 swiper 初始化操作 */
			open (list, index) {
				this.list = list;
				/* 设置默认slide */
				this.curSlide = index;

				this.startIndex = index;
			},

			/* 为 img 绑定 click 事件 */
			imgClick (e) {
				/*
					计算出当前的元素, 在所有的img 列表里面真正的位置
				*/
				this.imgs.forEach((img, index) => {
					if (e.target == img) {
						this.reallyIndex = index;
					}

					/* 
						计算出所有的图片的终点状态
						其实也不一定非要计算出所有的图片, 但是我这个, 我嫌麻烦; 

						然后这句一定要在每次点击的时候重新计算一遍, 因为不能保证两次
						点击之间没有发生滚动, 而滚动是会影响到位移的值的; 
					*/
				});


				/* 获取当前点击的img */
				this.current = e.target;
				this.curIndex = this.current.index;

				/* 获取当前点击元素的终点状态, 这个是为了动画 */
				this.endStatus[this.curIndex] = this.calEndStatus(this.current);

				this.showMask();

				/* 设置当前显示元素的属性 */
				this.setProperty(this.current);

				/* 放大 */
				this.transform(this.current, this.endStatus[this.curIndex]);

				/* 当图片放大之后, 需要执行一些操作 */
				let transitionend = () => {
					/*显示 swiper */
					this.showSwiper = true;

					/* 将容器的 zindex 设置成最高*/
					this.mask.style.zIndex = 2000;
					/* 还要把当前显示的图片的属性再重置回去*/
					this.current.removeEventListener('transitionend', transitionend, false);
				}

				this.current.addEventListener('transitionend', transitionend, false);
			},

			/* 显示黑色的背景层 */
			showMask () {
				/* 因为渲染的问题, 所以最好在 onload 结束, 其实就是异步*/
				this.mask = document.querySelector('.wc-mask');
				this.mask.classList.add('wc-mask-show');
				setTimeout(()=>{
					this.mask.classList.add('wc-mask-diff');
					this.mask.addEventListener('click', this.maskClick, false);
				}, 50);		
			},

			/* 点击 mask 就隐藏*/
			maskClick () {
				this.showSwiper = false;
				this.mask.style.zIndex = 'auto';

				this.mask.classList.remove('wc-mask-diff');
				let maskHide = ()=> {
					this.mask.classList.remove('wc-mask-show');
					this.mask.removeEventListener('transitionend', maskHide, false);
				}
				this.mask.addEventListener('transitionend', maskHide, false);

				this.current.style.transform = 'scale(1)';

				let imgHide = () => {
					this.recover(this.current, this.curIndex);
					this.current.removeEventListener('transitionend', imgHide, false);
				}
				this.current.addEventListener('transitionend', imgHide, false);
			},
			/* 滑动图片浏览器的时候 */
			transitionend (index) {

				/* 先恢复之前的那个元素*/
				this.recover(this.current, this.curIndex);

				this.current.style.transform = 'scale(1)';

				/* 设置当前 curSlide, 为的是给 pagination 一个交待*/
				this.curSlide = index;

				/* 多个列表从这里开始 index 就不一样了, 所以要改, 这里 index 要是在
				   所有的 img 列表里面的东西才可以; 
				*/
				/* 
					然后找到当前的元素是谁, 应该是谁? 其实算的话能算出来
					这个 rIndex 才是当前的;
					
					比如刚开始点击 a, 然后滚动之后, 又点击了 a

				*/

				let rIndex = this.reallyIndex + (index - this.startIndex);

				this.current = this.imgs[rIndex];

				/* 适配多个列表 */
				this.curIndex = this.current.index;

				
				this.endStatus[this.curIndex] = this.calEndStatus(this.current);

				this.setProperty(this.current);

				this.transform(this.current, this.endStatus[this.curIndex]);
			},
			transform (el, {xRadio, yRadio, xTranslate, yTranslate}) {
				el.style.transform =`translate3d(${xTranslate}px, ${yTranslate}px, 0px) scale(${xRadio}, ${yRadio})`; 
			},
			getProperty (img) {
				let m = getComputedStyle(img);
				return{
					position: m.position,
					zIndex: m.zIndex
				}
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
				/* 首先计算出缩放的比例 */
				/*
					先确定图片在 img-browser 里面显示的宽度; 
					如果图片的真实宽度, 小于屏幕的宽度, 则不再缩放, 按照真实的宽度进行显示
					如果图片的真实宽度大于屏幕的宽度, 图片的宽度需要是屏幕的宽度; 
						如果图片宽度为屏幕宽度
						查看当前的显示的宽度, 然后计算出 x 方向的缩放比例
						图片的真实宽度, 到图片显示的宽度的比例, 再将这个比例和图片的真实高度比较
						就能拿到图片在 img-browser 中显示的高度. 
				*/

				let index = img.index;
				let xRadio = 0;
				let yRadio = 0;
				/* 这个值在后面还要用 */
				let height = 0;
				let xTranslate = 0;
				let yTranslate = 0;

				if (this.size[index].naturalWidth > this.docWidth) {
					xRadio = parseFloat(this.docWidth /this.size[index].displayWidth);
					let radio = this.docWidth/this.size[index].naturalWidth;
					height = radio * this.size[index].naturalHeight;
					yRadio = parseFloat(height / this.size[index].displayHeight);

					/*
						先算一下如果元素距离顶部的距离为 0 的时候, 垂直居中, y 需要偏移多少; 
						再拿到当前元素实际距离顶部的距离
						如果实际距离, 大于需要的距离. 
					*/
					let offset = ( this.docHeight - height ) / 2;
					let top = img.getBoundingClientRect().top;
					/* x 轴位移 */
					xTranslate = -img.getBoundingClientRect().left;
					/*
						这样计算是错误的.
						if (top < offset) {
							
						} else {
							yTranslate = top - offset;
						}						
					*/
					yTranslate = parseFloat(offset - top);

					
					return {
						xRadio: xRadio,
						yRadio: yRadio,
						xTranslate: xTranslate,
						yTranslate: yTranslate
					}	
				}
			},

			setProperty (img) {
				if (img) {
					img.style.zIndex = 1000;
					img.style.position = 'relative';					
				}

			},
			recover (img, index) {
				/* 因为有时候有些图片没加载出来, 会报错 */
				if (img) {
					img.style.zIndex = this.property[index].zIndex;
					img.style.position = this.property[index].position;					
				}

			}

		}
	}
</script>