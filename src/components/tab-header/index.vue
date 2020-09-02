<template>
  <a-tabs
    class="tab-layout-tabs"
    style="height:52px"
    :hide-add="true"
    type="editable-card"
    :activeKey="activeKey"
    @change="onChange"
    @edit="onDelete"
  >
    <a-tab-pane :id="page.path" :key="page.path" v-for="page in pageList">
      <span slot="tab" :pagekey="page.path">{{ page.meta.title }}</span>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  props: {
    pageList: {
      type: Array,
      required: true
    },
    activeKey: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange(activeKey) {
      this.$emit('change', activeKey);
    },
    onDelete(targetKey) {
      this.$emit('delete', targetKey);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-layout-tabs {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  background-color: #fff;
  padding: 0 20px;
  /deep/ .ant-tabs-bar {
    margin: 4px 0 0;
    border: none;
    .ant-tabs-tab {
      margin: 0;
      border: none;
      border-bottom: 1px solid transparent;
      background-color: #fff;
      .ant-tabs-close-x {
        opacity: 0 !important;
      }
      &:hover .ant-tabs-close-x {
        opacity: 1 !important;
      }
    }
    .ant-tabs-tab-active {
      height: 40px;
      color: @primary-color;
      border-color: @primary-color;
      font-weight: 400;
    }
  }
}
</style>
