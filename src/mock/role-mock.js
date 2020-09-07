import Mock from 'mockjs';
Mock.mock('/sys/roles/page', 'get', {
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
Mock.mock(/\/sys\/roles[\s\S]*?/, 'delete', {
  code: 200,
  message: '删除成功'
});
Mock.mock(/\/sys\/roles[\s\S]*?/, 'put', {
  code: 200,
  message: '修改成功'
});
Mock.mock('/sys/roles', {
  code: 200,
  message: '操作成功',
  'data|1-20': [
    {
      'id|+1': 100,
      name: '@cname',
      code: '@string(3)',
      description: '@cparagraph()'
    }
  ]
});
