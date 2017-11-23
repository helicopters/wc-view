import Vue from 'vue'

import wcView from './wcView'

export default {
	install (Vue) {
		Vue.component('wcView', wcView);
	}
}