import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const namespaced = true;

export default {
  namespaced,
  state() {
    return {
      errorApi: '',
    };
  },
  actions,
  getters,
  mutations,
};
