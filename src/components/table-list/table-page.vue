<template>
  <div class="tablePage">
    <div class="btnbox"></div>
    <a-table
      :columns="tableData.columns"
      :data-source="tableData.data.data"
      :pagination="pagination"
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
  methods: {
    initTable() {},
    handleTableChange(page) {
      this.changeTable('table', page);
    }
  }
};
</script>
