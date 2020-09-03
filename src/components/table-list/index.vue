<template>
  <div class="tableList">
    <a-search-list
      :searchData="searchData"
      :changeTable="changeTable"
    ></a-search-list>
    <a-table-page
      :tableData="tableData"
      :pagination="pagination"
      :changeTable="changeTable"
    >
      <template slot="action" slot-scope="record">
        <slot name="action" :record="record" />
      </template>
    </a-table-page>
  </div>
</template>
<script>
import ASearchList from '@/components/table-list/search-list.vue';
import ATablePage from '@/components/table-list/table-page.vue';
export default {
  components: {
    ASearchList,
    ATablePage
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
