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
        添加<a-icon type="right" />
      </a-button>
    </template>
    <template slot="action" slot-scope="record">
      <a-row>
        <a-button type="link" size="small" @click="shipsDetail(record)">
          详情
        </a-button>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-button
                type="primary"
                size="small"
                @click="editCompany(record)"
              >
                修改
              </a-button>
            </a-menu-item>
            <a-menu-item key="2">
              <a-button
                type="danger"
                size="small"
                @click="deleteCompany(record)"
              >
                删除
              </a-button>
            </a-menu-item>
          </a-menu>
          <a-button type="link"> 更多 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </a-row>
      <!-- <a-button type="primary" size="small" @click="editCompany(record)">
        修改
      </a-button>
      <a-button type="danger" size="small" @click="deleteCompany(record)">
        删除
      </a-button> -->
    </template>
  </table-list>
</template>
<script>
import TableList from '@/components/table-list/';
import { getShipsTableData, deleteShipInfo } from '@/api/ships.js';
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
            title: '船名',
            dataIndex: 'shipName',
            key: 'shipName',
            width: 300
          },
          {
            title: '船名代码',
            dataIndex: 'shipCode',
            key: 'shipCode',
            width: 300
          },
          {
            title: '普通舱',
            dataIndex: 'generalCarbine',
            key: 'generalCarbine',
            width: 300
          },
          {
            title: '头等舱',
            dataIndex: 'firstCarbine',
            key: 'firstCarbine',
            width: 300
          },
          {
            title: '贵宾舱',
            dataIndex: 'VIPCarbine',
            key: 'VIPCarbine',
            width: 300
          },
          {
            title: '舱位数',
            dataIndex: 'carbinsCount',
            key: 'carbinsCount',
            width: 300
          },
          {
            title: '船公司',
            dataIndex: 'company',
            key: 'company',
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
            width: 180,
            fixed: 'right'
          }
        ],
        data: {}
      },
      searchData: [
        {
          type: 'input',
          label: '船名',
          value: '',
          prop: 'shipName',
          id: 1101
        },
        {
          type: 'input',
          label: '船名代码',
          value: '',
          prop: 'shipCode',
          id: 1102
        },
        {
          type: 'date',
          label: '创建时间',
          prop: 'dateval',
          id: 1103
        },
        {
          type: 'input',
          label: '公司',
          value: '',
          prop: 'company',
          id: 1104
        },
        {
          type: 'input',
          label: '电话',
          value: '',
          prop: 'phone',
          id: 1105
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
      getShipsTableData(this.queryParam).then(res => {
        this.tableData.data = res.data.records;
        this.pageIndex = res.data.current;
        this.pageSize = res.data.size;
        this.total = res.data.total;
      });
    },
    shipsDetail() {},
    addCompany() {
      this.$router.push({
        name: 'shipsAdd'
      });
    },
    editCompany(record) {
      let params = record.record.record;
      this.$router.push({
        name: 'shipsEdit',
        params: { record: params }
      });
    },

    deleteCompany(record) {
      deleteShipInfo(record.record.record.id).then(res => {
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
