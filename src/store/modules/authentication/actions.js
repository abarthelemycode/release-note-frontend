import types from './types';
import api from '@/plugins/axios';

const login = ({ commit }, data) => api.post('/login', data)
  .then((res) => {
    commit(types.SET_TOKEN, res.data.token);
  })
  .catch(err => err);

const logout = ({ commit }) => {
  commit(types.DELETE_TOKEN);
};

const isLogged = ({ state }) => (state.token !== null);

export default {
  login,
  logout,
  isLogged,
};
