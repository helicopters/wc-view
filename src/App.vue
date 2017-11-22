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
	// left: 100px;

	/* 不允许用户自己定义这个玩意. 如果定义, 结果自己负责. */
	// margin: 10px;
}



.box {
	// position:fixed;
	// top: 0;
	// right: 0;
	// left: 0;
	// bottom: 0;
	// height:100%;
	// width: 100%;
	// opacity: 0.8;
	// background: black;
	// z-index: 100;

	// display: flex;
	// align-items:center;
	// justify-content:center;

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
	// display
	opacity: 1;
}


</style>
<template>
	<div class="container">
		<h1 v-for="i in 19">ff</h1>
		<img src="https://bucket-zb-fanba.oss-cn-hangzhou.aliyuncs.com/4b4c9042e3754101ae11d4d97882cbc1.jpg" alt="" class="img">
		<p>11222</p>
		<h1 v-for="i in 19">ff</h1>

		<div class="box"></div>

	</div>
</template>
<script>
	export default {
		name: 'App',
		data () {
			return {
				width: 0,
				height: 0,
				naturalHeight: 0,
				naturalWidth: 0,
				show: false,
				position: '',
				zIndex: '',
				left: 0,
				top: 0
			}
		},
		mounted () {

			let img = document.querySelector('.img');

			img.onload = () => {

				// var nImg = img.cloneNode(true);

				// console.log(nImg);

				img.addEventListener('click', (e)=>{

					e.stopPropagation();

					/* 首先要改变 box 的状态*/

					let box = document.querySelector('.box');

					box.classList.add('box-show');
					setTimeout(()=>{
						box.classList.add('box-diff')
					}, 50);

					/* 
						然后改变图片的状态 
						z-index 要变的很大; 
						因为 z-index 只对定位属性生效, 所以还要判断定位属性; 

						保存这两个值. 

					*/
					this.position = getComputedStyle(img).position;
					this.zIndex = getComputedStyle(img).zIndex;

					// if (this.zIndex)
					img.style.zIndex = 100000;
					if (this.position == 'static') {
						img.style.position = 'relative';
					}

					/* 
						现在就要改变图片的位置和大小

						首先拿到图片显示的宽度;
						再拿到屏幕的宽度

						判断图片的真实宽度; 

						如果真实宽度小于屏幕宽度, 就不要放大了
						大于, 还是要放大; 

						让img 放大; 

						同时屏蔽掉原先设置的 left, top 值; 

						然后计算图片的高度;
						高度不能按照比例来; 

						高度还是按照等比缩放的

	we

					*/

					let imgWidth = img.width;

					let screenWidth = document.documentElement.clientWidth;

					let realWidth = img.naturalWidth;

					let radio = 0;

					if (realWidth < screenWidth) {
						// 不要放大
					} else {
						radio = screenWidth/imgWidth;
					}

					// img.style.transform = 'scale(' + radio + ')';


					this.left = getComputedStyle(img).left;

					this.top = getComputedStyle(img).top;

					// this.

					// img.style.position = 'fixed'
					img.style.left = 0;
					img.style.top = 0;


/*
计算出一个位置; 



*/					
					let top = img.getBoundingClientRect().top;

					// // let height = 
					// /* 拿到展示之后的大小*/
					// let showedHeight = img.height * radio;

					// let diff = document.



					console.log(img.getBoundingClientRect().top);

					let diff = document.documentElement.clientHeight - img.height*radio;



					let half = -diff/2;

					console.log(half,top,Math.abs(top) == Math.abs(half));


					if (Math.abs(top) == Math.abs(half)) {
						// alert(1)
						return;
					} else {



					
						console.log('这里啊')

					// 拿 top - half

					// let end = top - half;
					let end = Math.abs(top) - Math.abs(half);

					// if (top - end > 0) {
					// 	end = -end;
					// }

					if (top>0){
						end = -end;
					} else {
						end = Math.abs(top) + Math.abs(half)
					}



					// console.log(top, half, top-half)

					// console.log(top)
					// if (top< 0)

					img.style.transform = 'translateY(' + (end) + 'px) scale(' + radio + ')';


					// console.log(nImg)


}


				}, false);
			}


			// document.querySelector('.')
			let box = document.querySelector('.box');

			box.addEventListener('click', ()=>{
				// alert(1)

				/* 先将mask 给干掉 */
				box.classList.remove('box-diff');

				let handler = ()=>{
					box.classList.remove('box-show');
					box.removeEventListener('transitionend', handler, false);

				}

				box.addEventListener('transitionend', handler, false);

				// img.classList.remove('')

				img.style.transform = 'scale(1)';

				img.style.left = this.left;
				img.style.top = this.top;

				img.style.zIndex = this.zIndex;
				img.style.position = this.position;




			}, false);

		}
	}
</script>