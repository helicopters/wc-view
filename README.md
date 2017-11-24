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