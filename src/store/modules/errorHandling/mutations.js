import types from './types';


const getErrorApi = (state, error) => {
  state.errorApi = error;
};

export default {
  [types.GET_ERROR_API]: getErrorApi,
};
