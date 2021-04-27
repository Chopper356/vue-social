import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import Auth from './views/Auth';
import Page404 from './views/404';
import CreatePost from './views/CreatePost';
import Profile from './views/Profile';
import Users from './views/Users';

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
		path: '/create',
		name: 'CreatePost',
		component: CreatePost
	},
	{
		path: '/profile/:id',
		name: 'Profile',
		component: Profile
	},
	{
		path: '/users',
		name: 'Users',
		component: Users
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
