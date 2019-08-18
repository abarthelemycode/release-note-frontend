import types from './types';


const setToken = (state, token) => {
  localStorage.setItem('token', JSON.stringify(token));
  state.token = token;
  state.isLogged = true;
};


const deleteToken = (state) => {
  localStorage.removeItem('token');
  state.token = '';
  state.isLogged = false;
};

export default {
  [types.SET_TOKEN]: setToken,
  [types.DELETE_TOKEN]: deleteToken,
};
