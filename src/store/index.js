import Vuex from 'vuex';
import Vue from 'vue';
import { apiPlugin } from '@/plugins/axios';
import featureModule from './modules/feature';
import sendEmailModule from './modules/sendEmail';
import authenticationModule from './modules/authentication';
import errorHandlingModule from './modules/errorHandling';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    authenticationModule,
    featureModule,
    sendEmailModule,
    errorHandlingModule,
  },
  plugins: [apiPlugin],
});

export default store;
