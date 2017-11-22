import Vue from 'vue'
import App from './App'

// import wcView from './wc-view'
// Vue.use(wcView);

import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);


new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
