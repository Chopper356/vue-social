import axios from 'axios';
import store from './store';

let api = axios.create({
	baseURL: "http://localhost",
});

const setToken = (token) => {
	api.defaults.headers.common['Authorization'] = token;
	localStorage.token = token;
	store.state.is_auth = true;
	console.log("Set Token");
}

export default {api, setToken}

