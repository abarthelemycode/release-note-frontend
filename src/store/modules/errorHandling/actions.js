import types from './types';

const getErrorApi = ({ commit }, error) => {
  commit(types.GET_ERROR_API, error);
};


export default {
  getErrorApi,
};
