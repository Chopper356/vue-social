import Vue from 'vue';
import Vuex from 'vuex';
import http from '../http';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		is_auth: false,
		user: {},
		post_opened: null,
		image_opened: null,
		comments: [],
		profile: {}
	},
	mutations: {
	},
	actions: {
		getUserProfile(store) {
			http.api.get("/profile").then(({data}) => {
				if (data.success) {
					store.state.user = data.user;
				}
			})
		}
	},
	modules: {
	}
})
