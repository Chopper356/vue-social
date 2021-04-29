import Vue from 'vue';
import VueAxios from 'vue-axios';
import moment from 'vue-moment';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './http';

Vue.config.productionTip = false;

Vue.use(moment);
Vue.use(VueAxios, http.api);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
