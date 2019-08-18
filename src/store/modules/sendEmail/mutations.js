import types from './types';


const getSendingMessage = (state, message) => {
  state.message = message;
};

export default {
  [types.SENDING_RELEASE_NOTE]: getSendingMessage,
};
