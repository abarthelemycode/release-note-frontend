import types from './types';
import { removeDuplicatedObject } from '@/utils';


const sortFeatures = (features) => {
  const newFeatures = Array.prototype.slice.call(features);
  newFeatures.sort((a, b) => {
    const versionA = parseInt(a.version, 10);
    const versionB = parseInt(b.version, 10);
    const orderA = parseInt(a.order, 10);
    const orderB = parseInt(b.order, 10);
    // Order is only important when versions are the same
    if (versionA === versionB) return orderB - orderA;
    return (versionA < versionB) ? 1 : -1;
  });
  return newFeatures;
};

const filterFeatures = (state) => {
  const text = state.textHighlight;
  const versions = state.versionsDisplay;
  let tags = state.tagsDisplay;
  let categories = state.categoriesDisplay;
  let featuresDisplay = state.features;

  if (categories.length !== 0) {
    categories = categories.map(item => item.id);
    featuresDisplay = featuresDisplay.filter(item => categories.includes(item.category.id));
  }

  if (tags.length !== 0) {
    tags = tags.map(item => item.id);
    featuresDisplay = featuresDisplay.filter(item => item.tags.some(el => tags.includes(el.id)));
  }

  if (versions.length !== 0) {
    featuresDisplay = featuresDisplay.filter(item => versions.includes(item.version));
  }

  if (text.length > 3) {
    const regex = new RegExp(text, 'gi');
    featuresDisplay = featuresDisplay.filter((item) => {
      let val = false;
      if ((item.name).match(regex)) val = true;
      if ((item.text).match(regex)) val = true;
      item.tags.forEach((tag) => {
        if ((tag.name).match(regex)) val = true;
      });
      return val;
    });
  }

  featuresDisplay = removeDuplicatedObject(featuresDisplay, 'id');
  state.featuresDisplay = sortFeatures(featuresDisplay);
};

const getVersions = (state) => {
  const versions = [];
  const { features } = state;
  features.forEach((feature) => {
    if (versions.indexOf(feature.version) < 0) {
      versions.push(feature.version);
    }
  });
  versions.sort().reverse();
  state.versions = versions;
};


const getCategories = (state, categories) => {
  state.categories = categories;
};

const getTags = (state, tags) => {
  state.tags = tags;
};

const getFeatures = (state, features) => {
  state.features = features;
  getVersions(state);
  filterFeatures(state);
};

const getFeaturesByVersions = (state, features) => {
  state.features = features;
  getVersions(state);
  filterFeatures(state);
};

const filterFeaturesBySearch = (state, text) => {
  state.textHighlight = text;
  filterFeatures(state);
};

const filterFeaturesByCategories = (state, categories) => {
  state.categoriesDisplay = categories;
  filterFeatures(state);
};

const filterFeaturesByVersions = (state, versions) => {
  state.versionsDisplay = versions;
  filterFeatures(state);
};

const filterFeaturesByTags = (state, tags) => {
  state.tagsDisplay = tags;
  filterFeatures(state);
};


const addFeature = (state, feature) => {
  const { features } = state;
  features.push(feature);
  getFeatures(state, features);
};

const updateFeature = (state, feature) => {
  const features = state.features.map(item => ((item.id === feature.id) ? feature : item));
  getFeatures(state, features);
};

const deleteFeature = (state, feature) => {
  const features = state.features.filter(item => item.id !== feature.id);
  getFeatures(state, features);
};


export default {
  [types.GET_VERSIONS]: getVersions,
  [types.GET_TAGS]: getTags,
  [types.GET_CATEGORIES]: getCategories,
  [types.GET_FEATURES]: getFeatures,
  [types.GET_FEATURES_BY_VERSIONS]: getFeaturesByVersions,
  [types.FILTER_FEATURES_BY_SEARCH]: filterFeaturesBySearch,
  [types.FILTER_FEATURES_BY_VERSIONS]: filterFeaturesByVersions,
  [types.FILTER_FEATURES_BY_CATEGORIES]: filterFeaturesByCategories,
  [types.FILTER_FEATURES_BY_TAGS]: filterFeaturesByTags,
  [types.ADD_FEATURE]: addFeature,
  [types.UPDATE_FEATURE]: updateFeature,
  [types.DELETE_FEATURE]: deleteFeature,
};
