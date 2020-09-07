<template>
  <div class="userList">
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
        <a-button @click="add(record)">新增</a-button>
        <a-button @click="btnAction(record)">批量删除</a-button>
      </template>
      <template slot="action" slot-scope="record">
        <a @click="tableAction(record)">操作1</a>
        <a @click="tableAction(record)">操作2</a>
      </template>
    </table-list>
  </div>
</template>

<script>
import TableList from '@/components/table-list/';
import { getUserInfo } from '@/api/user-info.js';
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
            title: '用户名称',
            dataIndex: 'name',
            key: 'name',
            width: 100
          },
          {
            title: '用户电话',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 100
          },
          {
            title: '用户角色',
            dataIndex: 'rolesName',
            key: 'rolesName',
            width: 100
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
          label: '用户名',
          value: '',
          valname: 'username',
          id: 1101
        }
      ],
      queryParam: {
        current: 1,
        size: 10,
        name: ''
      },
      pageIndex: 0,
      pageSize: 0,
      total: 0
    };
  },
  methods: {
    async getData() {
      let res = await getUserInfo(this.queryParam);
      let records = res.data.records;
      let rolesName = [];
      let rolesId = [];
      console.log(records);
      records.map(obj => {
        obj.roles.map(roleobj => {
          rolesName.push(roleobj.name);
          rolesId.push(roleobj.id);
        });
        obj['rolesName'] = rolesName.join(',');
        obj['rolesId'] = rolesId.join(',');
      });
      console.log(res);
      console.log(this.tableData.data);
      this.tableData.data = res.data.records;
      this.pageIndex = res.data.current;
      this.pageSize = res.data.size;
      this.total = res.data.total;
    },
    tableAction(record) {
      console.log(record);
    },
    btnAction(records) {
      console.log(records);
    },
    changeTable(type, datas) {
      console.log(datas);
      if (type === 'table') {
        this.queryParam.pageIndex = datas.current;
        this.queryParam.pageSize = datas.pageSize;
      } else if (type === 'search') {
        for (let key in datas) {
          this.queryParam[key] = datas[key];
        }
      }
      this.getData();
    },
    add(record) {
      //切换页面
      console.log(record);
    }
  }
};
</script>

<style></style>
