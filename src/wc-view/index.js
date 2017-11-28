import Vue from 'vue'
import wcView from './wcView'

import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);

/* 因为我用了 classlist */
import 'classlist-polyfill'

import './style.css';

let ViewConstructor =  Vue.extend(wcView);

let instance = null;

let initInstance = ()=>{
    instance = new ViewConstructor({
        el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
}

let preview = (e, list, index, key)=>{
	initInstance();	
	instance.open(e, list, index, key);
}

export default {
	install (Vue) {
		Vue.prototype.$preview = preview;
	}
}