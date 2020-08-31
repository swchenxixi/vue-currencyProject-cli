<template>
  <div>
    <a-tabs
      class="tab-layout-tabs"
      style="height:52px"
      :hide-add="true"
      type="editable-card"
    >
      <a-tab-pane
        :id="page.fullPath"
        :key="page.fullPath"
        v-for="page in pageList"
      >
        <span slot="tab" :pagekey="page.fullPath">{{ page.meta.title }}</span>
      </a-tab-pane>
    </a-tabs>
    <div style="margin: 12px 12px 0"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageList: [
        { fullPath: '/option1', meta: { title: 'option 1' } },
        { fullPath: '/option2', meta: { title: 'option 2' } }
      ]
    };
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
