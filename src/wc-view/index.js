import Vue from 'vue'
import wcView from './wcView'

import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);

import './style.css';

export default {
	install (Vue) {
		Vue.component('wcView', wcView);
	}
}