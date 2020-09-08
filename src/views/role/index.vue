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
      <a-button type="primary" @click="addRole(record)">
        添加角色<a-icon type="right" />
      </a-button>
    </template>
    <template slot="action" slot-scope="record">
      <a-button type="primary" size="small" @click="editRole(record)">
        修改
      </a-button>
      <a-button type="danger" size="small" @click="deleteRole(record)">
        删除
      </a-button>
    </template>
  </table-list>
</template>
<script>
import TableList from '@/components/table-list/';
import { getRoleTableData, deleteRoleInfo } from '@/api/role-data.js';
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
          label: 'ID',
          value: '',
          valname: 'id',
          id: 1101
        },
        {
          type: 'input',
          label: 'Name',
          value: '',
          valname: 'name',
          id: 1104
        },
        {
          type: 'input',
          label: 'Code',
          value: '',
          valname: 'code',
          id: 1105
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
        this.tableData.data = res.data.records;
        this.pageIndex = res.data.current;
        this.pageSize = res.data.size;
        this.total = res.data.total;
      });
    },
    addRole() {
      this.$router.push({
        name: 'roleAdd'
      });
    },
    editRole(record) {
      let params = record.record.record;
      this.$router.push({
        name: 'roleEdit',
        params: { record: params }
      });
    },

    deleteRole(record) {
      deleteRoleInfo(record.record.record.id).then(res => {
        this.$notification.open({
          message: 'success',
          description: res.message,
          icon: <a-icon type="smile" style="color: #108ee9" />
        });
      });
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
