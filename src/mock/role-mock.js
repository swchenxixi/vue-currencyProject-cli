import Mock from 'mockjs';
Mock.mock('/sys/roles/page', {
  code: 200,
  message: '操作成功',
  data: {
    'records|4': [
      {
        'id|+1': 100,
        name: '@cname',
        ccode: '@string(3)',
        description: '@cparagraph()'
      }
    ],
    total: 4,
    size: 10,
    current: 1,
    pages: 1
  }
});
