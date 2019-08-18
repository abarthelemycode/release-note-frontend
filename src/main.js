import Vue from 'vue';
import Vuetify from 'vuetify';

import store from './store/index';
import App from './App.vue';
import router from './router';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
