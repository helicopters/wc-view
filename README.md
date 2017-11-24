## wc-view
移动端图片浏览插件


## 特点
* 刚开始用的一个浏览插件, 图片变形的问题始终解决不了, 所以自己搞了一个.
* 写了三天啊啊啊

## 安装
npm i wc-view --save

import wcView from 'wc-view'
Vue.use(wcView);

## 使用方式

```html
<img src="url" v-for="(url, key) in list" @click="$preview($event, list, key)">

```

图片上面的 class 最好去掉
z-index 暴漏个接口出来
样式最好不要加载
以及 swiper 的什么玩意???

还是有 bug, 当点击 slide 不能让


因为我设置的是 img width=100% 在图片的宽度小于 100% 的时候可能有问题. 

通过 style 设置的属性要记得兼容性处理一下. 






