import Vue from 'vue'
import App from './App'

import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);


import wcView from './wc-view'
Vue.use(wcView)


new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
