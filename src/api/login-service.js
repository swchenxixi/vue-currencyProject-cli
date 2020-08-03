import axios from 'axios';

// function delay(duration) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, duration);
//   });
// }

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
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const resp = await axios.get('/api/user/whoami', {
    headers: {
      token
    }
  });
  return resp.data;
}

export function logout() {
  localStorage.removeItem('token', null);
}
