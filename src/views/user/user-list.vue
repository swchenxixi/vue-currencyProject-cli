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
        <!-- <a-button @click="btnAction(record)">批量删除</a-button> -->
      </template>
      <template slot="action" slot-scope="record">
        <a @click="amend(record)">修改</a>
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
      const res = await getUserInfo(this.queryParam);
      const { records, current, size, total } = res.data;
      console.log(res.data);
      let rolesName = [];
      let rolesId = [];
      records.map(obj => {
        obj.roles.map(roleobj => {
          rolesName.push(roleobj.name);
          rolesId.push(roleobj.id);
        });
        obj['rolesName'] = rolesName.join(',');
        obj['rolesId'] = rolesId.join(',');
      });
      this.tableData.data = records;
      this.pageIndex = current;
      this.pageSize = size;
      this.total = total;
    },
    amend(record) {
      this.$router.push({ name: 'UserAdd', params: { records: record } });
    },
    btnAction(records) {
      console.log(records);
    },
    changeTable(datas) {
      this.queryParam = { ...this.queryParam, ...datas };
      this.getData();
    },
    add(record) {
      //切换页面
      console.log(record);
      this.$router.push({ name: 'UserAdd' });
    }
  }
};
</script>

<style lang="less" scoped></style>
