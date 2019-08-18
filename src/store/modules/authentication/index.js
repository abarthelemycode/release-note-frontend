import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { getToken, isLogged } from '@/utils';

const namespaced = true;

export default {
  namespaced,
  state() {
    return {
      token: getToken(),
      isLogged: isLogged(),
    };
  },
  actions,
  getters,
  mutations,
};
