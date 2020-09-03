<template>
  <div class="tablePage">
    <div class="clearfix">
      <div class="btnbox">
        <slot name="btnbox" :record="selectedRows" />
      </div>
    </div>

    <a-table
      :columns="tableData.columns"
      :data-source="tableData.data.data"
      :pagination="pagination"
      :row-selection="rowSelection"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <slot name="action" :record="record" />
      </span>
    </a-table>
  </div>
</template>
<script>
import { Table } from 'ant-design-vue';
export default {
  components: {
    ATable: Table
  },
  props: {
    tableData: Object,
    pagination: Object,
    changeTable: Function
  },
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: []
    };
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      };
    }
  },
  methods: {
    initTable() {},
    handleTableChange(page) {
      this.changeTable('table', page);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    }
  }
};
</script>
<style lang="less" scoped>
.clearfix::after {
  display: block;
  content: '';
  clear: both;
}
.btnbox {
  float: right;
  margin-bottom: 10px;
}
</style>
