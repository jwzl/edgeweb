import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Twin from '../components/Twin.vue'
import Device from '../components/Device.vue'
import Edge from '../components/Edge.vue'
import Other from '../components/Other.vue'

export default new VueRouter({
	routes: [
		{
			path: '/twin',
			name: 'twin',
			component: Twin,
		},
		{
			path: '/device',
			name: 'device',
			component: Device,
		},
		{
			path: '/edge',
			name: 'Edge',
			component: Edge,
		},
		{
			path: '/other',
			name: 'Other',
			component: Other,
		},
	]
})
