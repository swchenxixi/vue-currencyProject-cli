import Mock from 'mockjs';
Mock.mock('/ship/ship/page', 'get', {
  code: 200,
  message: '操作成功',
  data: {
    'records|4': [
      {
        'id|+1': 100,
        shipName: '@cparagraph(1)',
        'shipCode|+5': 558,
        'generalCarbine|+9': 166,
        'firstCarbine|+9': 79,
        'VIPCarbine|+9': 45,
        'carbinsCount|+9': 256,
        company: '@cname',
        'phone|+3': 18279712988,
        createTime: '@date("yyyy-MM-dd") ',
        description: '@cparagraph()'
      }
    ],
    total: 4,
    size: 2,
    current: 1,
    pages: 1
  }
});
Mock.mock('/ship/ship', 'post', {
  code: 200,
  message: '添加成功'
});
Mock.mock(/\/ship\/ship[\s\S]*?/, 'put', {
  code: 200,
  message: '修改成功'
});
Mock.mock(/\/ship\/ship[\s\S]*?/, 'delete', {
  code: 200,
  message: '删除成功'
});
