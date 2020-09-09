import Mock from 'mockjs';
Mock.mock('/ship/shipCompany/page', 'get', {
  code: 200,
  message: '操作成功',
  data: {
    'records|4': [
      {
        'id|+1': 100,
        name: '@cparagraph(1)',
        address: '@cparagraph(2)',
        legalPerson: '@cname',
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
Mock.mock('/ship/shipCompany', 'post', {
  code: 200,
  message: '添加成功'
});
Mock.mock(/\/ship\/shipCompany[\s\S]*?/, 'put', {
  code: 200,
  message: '修改成功'
});
Mock.mock(/\/ship\/shipCompany[\s\S]*?/, 'delete', {
  code: 200,
  message: '删除成功'
});
