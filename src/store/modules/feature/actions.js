import types from './types';
import api from '@/plugins/axios';


const getTags = ({ commit }) => api.get('/tags').then((res) => {
  commit(types.GET_TAGS, res.data);
}).catch(err => err);


const getCategories = ({ commit }) => api.get('/categories').then((res) => {
  commit(types.GET_CATEGORIES, res.data);
}).catch(err => err);


const getFeatures = ({ commit }) => api.get('/features').then((res) => {
  const features = res.data;
  commit(types.GET_FEATURES, features);
  commit(types.GET_VERSIONS, features);
}).catch(err => err);

const getFeaturesByVersions = ({ commit }, data) => api.post('/features-versions', data).then((res) => {
  const features = res.data;
  commit(types.GET_FEATURES, features);
}).catch(err => err);

const filterFeaturesBySearch = ({ commit }, text) => {
  commit(types.FILTER_FEATURES_BY_SEARCH, text);
};

const filterFeaturesByVersions = ({ commit }, versions) => {
  commit(types.FILTER_FEATURES_BY_VERSIONS, versions);
};

const filterFeaturesByCategories = ({ commit }, categories) => {
  commit(types.FILTER_FEATURES_BY_CATEGORIES, categories);
};

const filterFeaturesByTags = ({ commit }, tags) => {
  commit(types.FILTER_FEATURES_BY_TAGS, tags);
};

const addFeature = ({ commit }, data) => api.post('/features', data).then((res) => {
  commit(types.ADD_FEATURE, res.data);
}).catch(err => err);

const updateFeature = ({ commit }, data) => api.put(`/features/${data.id}`, data).then((res) => {
  commit(types.UPDATE_FEATURE, res.data);
}).catch(err => err);

const deleteFeature = ({ commit }, data) => api.delete(`/features/${data.id}`).then(() => {
  commit(types.DELETE_FEATURE, data);
}).catch(err => err);

export default {
  getTags,
  getCategories,
  getFeatures,
  getFeaturesByVersions,
  filterFeaturesByTags,
  filterFeaturesByCategories,
  filterFeaturesByVersions,
  filterFeaturesBySearch,
  addFeature,
  updateFeature,
  deleteFeature,
};
