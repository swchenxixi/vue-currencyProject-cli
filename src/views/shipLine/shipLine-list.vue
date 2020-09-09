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
        <a @click="del(record)">删除</a>
      </template>
    </table-list>
  </div>
</template>

<script>
import TableList from '@/components/table-list/';
import { getLineData, delLineData } from '@/api/shipLine-data.js';
import { getAllPortData } from '@/api/port-data.js';
export default {
  components: {
    TableList
  },
  created() {
    this.getData();
    //获取所有港口列表
    this.getAllPort();
  },
  data() {
    return {
      tableData: {
        columns: [
          {
            title: '航线',
            dataIndex: 'name',
            key: 'name',
            width: 100
          },
          {
            title: '航线代码',
            dataIndex: 'code',
            key: 'code',
            width: 100
          },
          {
            title: '进/出',
            dataIndex: 'io',
            key: 'io',
            width: 100
          },
          {
            title: '始发港',
            dataIndex: 'depHarborId',
            key: 'depHarborId',
            width: 100
          },
          {
            title: '目的港',
            dataIndex: 'destHarborId',
            key: 'destHarborId',
            width: 100
          },
          {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: 100
          },
          //   {
          //     title: '创建时间',
          //     dataIndex: 'latitude',
          //     key: 'latitude',
          //     width: 100
          //   },
          {
            title: '操作',
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
          type: 'select',
          label: '始发港',
          value: [],
          prop: 'depHarborId',
          id: 1101
        },
        {
          type: 'select',
          label: '目的港',
          value: [],
          prop: 'destHarborId',
          id: 1102
        },
        {
          type: 'daterange',
          label: '操作时间',
          value: ['2020-09-01', '2020-09-02'],
          prop: 'daterangeval',
          id: 1103
        }
      ],
      queryParam: {
        current: 1,
        size: 10,
        depHarborId: '',
        destHarborId: ''
      },
      pageIndex: 0,
      pageSize: 0,
      total: 0,
      ports: []
    };
  },
  methods: {
    async getData() {
      const res = await getLineData(this.queryParam);
      const { records, current, pageSize, total } = res.data;
      console.log(res.data);
      this.tableData.data = records;
      this.pageIndex = current;
      this.pageSize = pageSize;
      this.total = total;
    },
    amend(record) {
      console.log(record);
      this.$router.push({
        path: '/shipLine-add',
        params: { id: record.record.record.id }
      });
    },
    async del(record) {
      console.log(record.record.record);
      let ids = record.record.record.id;
      //调删除接口
      let res = await delLineData(ids);
      console.log(res);
      this.getData();
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
      this.$router.push({ path: '/shipLine-add' });
    },
    async getAllPort() {
      let res = await getAllPortData();
      console.log(res.data);
      res.data.map(obj => {
        this.ports.push({
          id: obj.id,
          label: obj.name
        });
      });
      this.searchData[0].value = JSON.parse(JSON.stringify(this.ports));
      this.searchData[1].value = JSON.parse(JSON.stringify(this.ports));
    }
  }
};
</script>

<style lang="less" scoped></style>
