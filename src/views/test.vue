<template>
  <a-layout>
    <a-layout-sider v-model="collapsed" theme="light">
      <side-menu :collapsed="collapsed" @select="selectMenu" />
    </a-layout-sider>
    <a-layout class="layout">
      <a-layout-header class="header">
        <global-header @toggleCollapsed="toggleCollapsedMenu" />
      </a-layout-header>
      <a-layout-content>
        <tab-layout />
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import SideMenu from '@/components/side-menu';
import GlobalHeader from '@/components/global-header';
import TabLayout from '@/layouts/tab-layout';
export default {
  components: {
    SideMenu,
    GlobalHeader,
    TabLayout
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    toggleCollapsedMenu(value) {
      this.collapsed = value;
    },
    selectMenu(obj) {
      console.log(obj);
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  .header {
    padding: 0 12px 0 0;
    background-color: @primary-color;
    height: 59px;
    line-height: 59px;
    color: #fff;
  }
}
</style>
