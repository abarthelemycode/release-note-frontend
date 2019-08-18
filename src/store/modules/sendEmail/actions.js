import types from './types';
import api from '@/plugins/axios';


const sendReleaseNote = ({ commit }, data) => api.post('/send-releasenote', data).then((res) => {
  commit(types.SENDING_RELEASE_NOTE, res.data.message);
}).catch(err => err);


export default {
  sendReleaseNote,
};
