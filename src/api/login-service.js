import axios from '@/axios';
export async function login(loginId, loginPassword) {
  const resp = await axios.post('/api/user/login', {
    loginId,
    loginPassword
  });
  //拿到服务器令牌
  let token = null,
    data = false;
  if (loginId === 'admin' && loginPassword === 'solemn') {
    token = resp.headers.token || 1232;
    data = resp.data;
  }
  if (token) {
    //把服务器令牌保存起来
    localStorage.setItem('token', token);
  }
  return data;
}

export async function whoAmI() {
  const resp = await axios.get('/api/user/whoami');
  return resp.data;
}
// eg2:未做请求拦截情况，每次请求需要加上token
// export async function getPermissions() {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return null;
//   }
//   const resp = await this.axios.get('/api/permissions', {
//     headers: {
//       token
//     }
//   });
//   return resp.data;
// }

export function logout() {
  localStorage.removeItem('token', null);
}
