import Vue from 'vue'
import App from './App'



import wcView from './wc-view'
Vue.use(wcView)


new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
