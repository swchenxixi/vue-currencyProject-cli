import Mock from 'mockjs';

Mock.mock('/ship/harbor/page', 'get', {
  code: 200,
  message: '操作成功',
  data: {
    'records|4': [
      {
        'id|+1': 100,
        address: '@county(true)',
        'code|8': '@string',
        'country|1': ['中国', '韩国', '印度', '新加坡', '泰国'],
        'isDeleted|0-1': 1,
        'latitude|20-120.1-2': 20,
        'longitude|20-120.1-2': 20,
        name: '@cname'
      }
    ],
    total: 4,
    pageSize: 10,
    current: 1
  }
});

Mock.mock(/\/ship\/harbor\/[\d]+?/, 'get', {
  code: 200,
  message: '操作成功',
  data: {
    address: '@county(true)',
    'code|8': '@string',
    'country|1': ['中国', '韩国', '印度', '新加坡', '泰国'],
    'isDeleted|0-1': 1,
    'latitude|20-120.1-2': 20,
    'longitude|20-120.1-2': 20,
    name: '@cname'
  }
});

Mock.mock(/\/ship\/harbor\/[\d]+?/, 'put', {
  code: 200,
  message: '修改成功'
});

Mock.mock(/\/ship\/harbor\/[\d]+?/, 'delete', {
  code: 200,
  message: '删除成功'
});

Mock.mock('/ship/harbor', 'post', {
  code: 200,
  message: '添加成功'
});

Mock.mock('/ship/harbor', 'get', {
  code: 200,
  message: '操作成功',
  'data|4': [
    {
      'id|+1': 100,
      address: '@county(true)',
      'code|8': '@string',
      'country|1': ['中国', '韩国', '印度', '新加坡', '泰国'],
      'isDeleted|0-1': 1,
      'latitude|20-120.1-2': 20,
      'longitude|20-120.1-2': 20,
      name: '@cname'
    }
  ]
});
