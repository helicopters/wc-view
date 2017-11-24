<style lang="less" scoped>
.wc-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: black;
  opacity: 0;
  will-change: opacity;
  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
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
	z-index: 10;
}
</style>
<template>
	<!-- 图片浏览器容器 -->
	<div class="wc-mask" v-if="show">
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
		data () {
			return {
				show: false,
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
				/* 遮罩层 */
				mask: null,
				list: [],
				children: []
			}
		},
		mounted () {
			this.getDocSize();
			/* 为页面上的图片绑定 click 事件 */
		},
		methods: {
			/* 获取当前屏幕的高度和宽度, 后面计算 scale 需要用到 */
			getDocSize () {
				this.docHeight = window.innerHeight;
				this.docWidth = window.innerWidth;
			},
			/* 这玩意是给用户调用的, 主要就是做一个 swiper 初始化操作 */
			open (e, list, index) {
				this.show = true;
				this.list = list;

				/* 初始化一下 curSlide */
				this.curSlide = index;

				this.current = e.target;

				let parent = e.target.parentElement;
				let children = parent.children;
				this.children = children;

				/* 等渲染结束 */
				setTimeout(()=>{
					this.showMask();
				}, 20)


				this.property = this.getProperty(this.current);
				this.endStatus = this.calEndStatus(this.current);
				/* 然后放大img*/
				this.transform(this.current, this.endStatus);
				/* 同时要让 img 的 z-index 比 box 的高 */
				this.setProperty(this.current);
				/* 并且在 img 放大结束之后, 需要显示 swiper */
				let transitionend = () => {
					this.current.removeEventListener('transitionend', transitionend, false);
					/* 首先还是要把图片的 z-index 降低, 要不然显示不出来其他的元素 */
					this.recover(this.current);
					/* 然后要展示 swiper*/
					this.showSwiper = true;
				}
				this.current.addEventListener('transitionend', transitionend, false);
			},
			/* 为 img 绑定 click 事件 */
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
				/* 隐藏 swiper */
				this.showSwiper = false;
				/* 隐藏 box */
				this.mask.classList.remove('wc-mask-diff');
				let maskHide = ()=> {
					this.mask.classList.remove('wc-mask-show');
					this.show = false;
					this.mask.removeEventListener('transitionend', maskHide, false);
				}
				this.mask.addEventListener('transitionend', maskHide, false);
				/* 恢复图片 */
				this.setProperty(this.current);
				this.current.style.transform = 'scale(1)';
				let imgHide = () => {
					this.recover(this.current, this.property);
					this.current.removeEventListener('transitionend', imgHide, false);
				}
				this.current.addEventListener('transitionend', imgHide, false);
			},
			/* 滑动图片浏览器的时候 */
			transitionend (index) {
				/* 滑动之后要重置分页 */
				this.curSlide = index;
				/* 重置分页
					再点击的时候, 恢复的实际上是之前的那个元素, 所以我们要让之前的那个元素已经恢复了
				*/
				/* 先恢复之前的那个元素*/
				this.recover(this.current);
				this.current.style.transform = 'scale(1)';
				this.current = this.children[index];
				/* 要放大, 但是不能让我们看见*/
				this.endStatus = this.calEndStatus(this.current);
				/* 然后放大img*/
				this.transform(this.current, this.endStatus);
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
				if (img.naturalWidth > this.docWidth) {
					xRadio = parseFloat(this.docWidth /img.width);
					let radio = this.docWidth/img.naturalWidth;
					height = radio * img.naturalHeight;
					yRadio = parseFloat(height / img.height);
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
					img.style.zIndex = 100;
					img.style.position = 'relative';					
				}
			},
			recover (img) {
				/* 因为有时候有些图片没加载出来, 会报错 */
				if (img) {
					img.style.zIndex = this.property.zIndex;
					img.style.position = this.property.position;					
				}
			}
		}
	}
</script>