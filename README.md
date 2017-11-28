## wc-view
移动端图片浏览插件. 

## 演示地址
[演示地址](http://m.youku.com/video/id_XMzE5MDE1NTA3Mg==.html?sharefrom=iphone&sharekey=a0304b40a8da943a028e4b34519067292&from=singlemessage&isappinstalled=0&source=)

## 安装
```shell
npm i wc-view --save-dev
```

## 使用
```shell
import wcView from 'wc-view';
import 'wc-view/style.css';
Vue.use(wcView);
```

```html
img 标签时: 
<img class="wc-preview-img" :src="url" v-for="(url, key) in list" :key="key" @click="$preview($event, list, key)">

如果 list 是一个对象数组的时候,
需要额外为 $preview 传递一个参数, 用于标记对象里哪一个字段是图片 url;
<img class="wc-preview-img" :src="item.img" v-for="(item, key) in list" :key="key" @click="$preview($event, list, key,'img')">

背景图时:
<div v-for="(url, key) in list" :key="key" @click="$preview($event, list, key)">
```

## img 和 背景图之间的区别:
* img的查看效果, 图片带一个放大效果; 而背景图不带;
* 为 img 设置大小的时候, 可能会显示变形, 而背景图可以通过 background-size 保持图片
显示正常;
* 需要额外的为 img 标签加上一个 wc-perview-img class, 为的是放大效果正常显示;

## 其他
* 压缩之后在 10k 左右;
* 默认的图片显示方式是宽度优先, 高度会按比例缩放;(一般情况下图片的宽度会被变成 100% 屏幕宽度)
* 支持 pagination;


## 项目地址
[wc-view](https://github.com/helicopters/wc-view);











