import Mock from 'mockjs';
Mock.mock('/api/table/getTableData', 'post', () => {
  return {
    success: true,
    message: '查询成功',
    code: 200,
    data: {
      data: [
        {
          id: 101,
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 102,
          key: 2,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 103,
          key: 3,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 104,
          key: 4,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 105,
          key: 5,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 106,
          key: 6,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 107,
          key: 7,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 108,
          key: 8,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 109,
          key: 9,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 110,
          key: 10,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          id: 111,
          key: 11,
          name: 'hahaha',
          age: 3,
          address: 'Lake Park',
          tags: ['nice']
        },
        {
          id: 112,
          key: 12,
          name: 'hahaha',
          age: 3,
          address: 'Lake Park',
          tags: ['nice']
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      total: 13
    }
  };
});
