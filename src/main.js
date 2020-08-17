import Vue from 'vue'
import App from './App.vue'
import  VueResource  from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import router from './router'
import JsonViewer from 'vue-json-viewer'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI)//全局使用ElementUI 
Vue.use(VueRouter)
Vue.use(JsonViewer) 

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
