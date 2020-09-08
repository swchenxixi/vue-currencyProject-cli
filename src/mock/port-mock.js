import Mock from 'mockjs';
Mock.mock('/ship/harbor/page', {
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

Mock.mock(/\/ship\/harbor[\s\S]*?/, {
  code: 200,
  message: '删除成功'
});

Mock.mock('/ship/harbor', {
  code: 200,
  message: '添加成功'
});
