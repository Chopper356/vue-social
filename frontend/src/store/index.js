import Vue from 'vue';
import Vuex from 'vuex';
import http from '../http';
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		is_auth: false,
		user: {},
		profile: {}
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
		},
		openProfile(store, id) {
			http.api.get(`/user/profile/${id}`).then(({data}) => {
				if (data.success) {
					store.state.profile = data.user;
					
					if (data.user._id != id) {
						router.push({ path: `/profile/${data.user._id}` });
					}
				}
			})
		}
	},
	modules: {
	}
})
