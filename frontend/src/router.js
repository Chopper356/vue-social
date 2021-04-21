import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import Auth from './views/Auth';
import Page404 from './views/404';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Auth
	},
	{
		path: '/404',
		name: '404',
		component: Page404
	},
	{
		path: '*',
		redirect: '/404',
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
