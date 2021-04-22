import Vue from 'vue';
import Vuex from 'vuex';
import http from '../http';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		is_auth: false,
		user: {}
	},
	mutations: {
	},
	actions: {
		getUserProfile(store) {
			http.api.get("/user/profile").then(({data}) => {
				if (data.success) {
					store.state.user = data.user;
				}
			})
		}
	},
	modules: {
	}
})
