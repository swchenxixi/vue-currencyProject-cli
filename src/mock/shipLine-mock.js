import Mock from 'mockjs';

Mock.mock('/ship/voyage/page', 'get', {
  code: 200,
  message: '操作成功',
  data: {
    'records|4': [
      {
        'id|+1': 100,
        'depHarborId|+1': 1000,
        code: '@string',
        depHarborName: '@string',
        'destHarborId|+1': 2000,
        destHarborName: '@string',
        'harborIds|+1': 3000,
        io: '@cname',
        'isDeleted|0-1': 1,
        name: '@cname',
        remark: '@cparagraph'
      }
    ],
    total: 4,
    pageSize: 10,
    current: 1
  }
});

Mock.mock(/\/ship\/voyage\/[\d]+?/, 'get', {
  code: 200,
  message: '操作成功',
  data: {
    'depHarborId|+1': 1000,
    code: '@string',
    depHarborName: '@string',
    'destHarborId|+1': 2000,
    destHarborName: '@string',
    'harborIds|+1': 3000,
    io: '@cname',
    'isDeleted|0-1': 1,
    name: '@cname',
    remark: '@cparagraph'
  }
});

Mock.mock(/\/ship\/voyage\/[\d]+?/, 'put', {
  code: 200,
  message: '修改成功'
});

Mock.mock(/\/ship\/voyage\/[\d]+?/, 'delete', {
  code: 200,
  message: '删除成功'
});

Mock.mock('/ship/voyage', 'post', {
  code: 200,
  message: '添加成功'
});
