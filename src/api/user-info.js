import axios from 'axios';
import '@/mock/user-mock.js';
async function getUserInfo(params) {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return null;
  //   }
  //   axios.defaults.headers.common['token'] = token;
  let res = await axios.get('/sys/user/page', params);
  return res.data;
}

export { getUserInfo };
