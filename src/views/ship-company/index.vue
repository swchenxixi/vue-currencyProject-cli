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
      <a-button type="primary" @click="addCompany(record)">
        添加船司<a-icon type="right" />
      </a-button>
    </template>
    <template slot="action" slot-scope="record">
      <a-button type="primary" size="small" @click="editCompany(record)">
        修改
      </a-button>
      <a-button type="danger" size="small" @click="deleteCompany(record)">
        删除
      </a-button>
    </template>
  </table-list>
</template>
<script>
import TableList from '@/components/table-list/';
import {
  getCompaneTableData,
  deleteCompanyInfo
} from '@/api/ship-company-data.js';
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
            title: '公司名',
            dataIndex: 'name',
            key: 'name',
            width: 300
          },
          {
            title: '公司地址',
            dataIndex: 'address',
            key: 'address',
            width: 300
          },
          {
            title: '法人',
            dataIndex: 'legalPerson',
            key: 'legalPerson',
            width: 300
          },
          {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            width: 300
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 300
          },
          {
            title: '备注',
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
          label: '公司ID',
          value: '',
          prop: 'id',
          id: 1101
        },
        {
          type: 'input',
          label: '公司名称',
          value: '',
          prop: 'name',
          id: 1104
        },
        {
          type: 'date',
          label: '创建时间',
          prop: 'dateval',
          id: 1102
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
  watch: {
    $route: function(to, from) {
      console.log('to', to), console.log('from', from);
    }
  },
  methods: {
    getData() {
      getCompaneTableData(this.queryParam).then(res => {
        this.tableData.data = res.data.records;
        this.pageIndex = res.data.current;
        this.pageSize = res.data.size;
        this.total = res.data.total;
      });
    },
    addCompany() {
      this.$router.push({
        name: 'companyAdd'
      });
    },
    editCompany(record) {
      let params = record.record.record;
      this.$router.push({
        name: 'companyEdit',
        params: { record: params }
      });
    },

    deleteCompany(record) {
      deleteCompanyInfo(record.record.record.id).then(res => {
        this.$notification.open({
          message: 'success',
          description: res.message,
          icon: <a-icon type="smile" style="color: #108ee9" />
        });
        this.getData();
      });
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
