import Mock from 'mockjs';
Mock.mock('/sys/user/page', {
  code: 200,
  message: '操作成功',
  data: {
    'records|4': [
      {
        'id|+1': 100,
        username: '@name',
        name: '@cname',
        'mobile|1': [
          '13531544954',
          '13632250649',
          '15820292420',
          '15999905612'
        ],
        description: '@cparagraph()',
        'roles|1-3': [
          {
            'id|+1': 200,
            name: '@cname'
          }
        ]
      }
    ],
    total: 4,
    size: 10,
    current: 1,
    pages: 1
  }
});
