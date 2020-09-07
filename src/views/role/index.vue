<template>
  <table-list
    :tableData="tableData"
    :searchData="searchData"
    :pagination="{
      total: total,
      pageSize: pageSize
    }"
    :changeTable="changeTable"
  >
    <template slot="btnbox" slot-scope="record">
      <a-button @click="btnAction(record)">添加角色</a-button>
      <a-button @click="btnAction(record)">操作2</a-button>
    </template>
    <template slot="action" slot-scope="record">
      <a @click="tableAction(record)">修改</a>
      <a @click="tableAction(record)">删除</a>
    </template>
  </table-list>
</template>
<script>
import TableList from '@/components/table-list/';
import { getRoleTableData } from '@/api/role-data.js';
export default {
  components: {
    TableList
  },
  created() {
    this.getData();
  },
  data() {
    return {
      tableData: {
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300
          },
          {
            title: 'Code',
            dataIndex: 'ccode',
            key: 'ccode',
            width: 300
          },
          {
            title: 'escription',
            dataIndex: 'description',
            key: 'description',
            width: 300
          },
          {
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            width: 150,
            fixed: 'right'
          }
        ],
        data: {}
      },
      searchData: [
        {
          type: 'input',
          label: '输入框',
          value: '',
          valname: 'age',
          id: 1101
        },
        {
          type: 'date',
          label: '时间范围',
          value: ['2020-09-01', '2020-09-02'],
          valname: 'dateval',
          id: 1102
        },
        {
          type: 'select',
          label: '下拉框',
          value: [
            {
              label: '全部',
              id: 200
            },
            {
              label: 'option1',
              id: 201
            },
            {
              label: 'option2',
              id: 202
            }
          ],
          valname: 'selectval',
          id: 1103
        },
        {
          type: 'input',
          label: '输入框',
          value: '',
          valname: 'inputval2',
          id: 1104
        }
      ],
      queryParam: {
        pageIndex: 1,
        pageSize: 10,
        name: '',
        dateval: '',
        selectval: '',
        inputval2: ''
      },
      pageIndex: 0,
      pageSize: 0,
      total: 0
    };
  },
  methods: {
    getData() {
      getRoleTableData(this.queryParam).then(res => {
        console.log('111', res);
        this.tableData.data = res.data.records;
        this.pageIndex = res.data.current;
        this.pageSize = res.data.size;
        this.total = res.data.total;
      });
    },
    tableAction(record) {
      console.log(record);
    },
    btnAction(records) {
      console.log(records);
    },
    changeTable(type, datas) {
      if (type === 'table') {
        this.queryParam.pageIndex = datas.current;
        this.queryParam.pageSize = datas.pageSize;
      } else if (type === 'search') {
        for (let key in datas) {
          this.queryParam[key] = datas[key];
        }
      }
      this.getData();
    }
  }
};
</script>

<style scoped lang="less"></style>
