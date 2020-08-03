import Mock from 'mockjs';

Mock.mock('/api/user/login', 'post', () => {
  return {
    msg: 'success',
    code: 0,
    data: 'xxx'
  };
});

Mock.mock('/api/user/whoami', 'get', () => {
  return {
    msg: 'success',
    code: 0,
    data: {
      name: '张三'
    }
  };
});
