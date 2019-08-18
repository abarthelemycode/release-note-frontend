import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const namespaced = true;

export default {
  namespaced,
  state() {
    return {
      features: [],
      featuresDisplay: [],
      versions: [],
      versionsDisplay: [],
      categories: [],
      categoriesDisplay: [],
      tags: [],
      tagsDisplay: [],
      textHighlight: '',
    };
  },
  actions,
  getters,
  mutations,
};
