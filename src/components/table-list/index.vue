<template>
  <div class="tableList">
    <search-list
      :searchData="searchData"
      :changeTable="changeTable"
    ></search-list>
    <table-page
      :tableData="tableData"
      :pagination="pagination"
      :changeTable="changeTable"
    >
      <template slot="btnbox" slot-scope="record">
        <slot name="btnbox" :record="record" />
      </template>
      <template slot="action" slot-scope="record">
        <slot name="action" :record="record" />
      </template>
    </table-page>
  </div>
</template>
<script>
import SearchList from '@/components/table-list/search-list.vue';
import TablePage from '@/components/table-list/table-page.vue';
export default {
  components: {
    SearchList,
    TablePage
  },
  props: {
    tableData: Object,
    searchData: Array,
    changeTable: Function,
    pagination: Object
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped></style>
