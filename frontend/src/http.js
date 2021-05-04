import axios from 'axios';
import store from './store';

let api = axios.create({
	baseURL: process.env.NODE_ENV == "dev" ? "http://localhost:3000/api" : document.location.origin + "/api",
});

const setToken = (token) => {
	api.defaults.headers.common['Authorization'] = token;
	localStorage.token = token;
	store.state.is_auth = true;
	store.dispatch("getUserProfile");
	console.log("Set Token");
}

const signOut = () => {
	delete api.defaults.headers.common['Authorization'];
	localStorage.removeItem("token");
	store.state.is_auth = false;
	console.log("Sign Out");
}

export default {api, setToken, signOut};

