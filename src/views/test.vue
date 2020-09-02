<template>
  <a-layout>
    <a-layout-sider v-model="collapsed" theme="light">
      <side-menu
        :menus="menus"
        :collapsed="collapsed"
        @select="selectMenu"
        :selectedKeys="[activeKey]"
      />
    </a-layout-sider>
    <a-layout class="layout">
      <a-layout-header class="header">
        <global-header @toggleCollapsed="toggleCollapsedMenu" />
      </a-layout-header>
      <a-layout-content>
        <tab-layout>
          <tab-header
            slot="header"
            :pageList="pageList"
            :activeKey="activeKey"
            @change="onChangeTab"
          ></tab-header>
          <div slot="main">主体区域</div>
        </tab-layout>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import SideMenu from '@/components/side-menu';
import GlobalHeader from '@/components/global-header';
import TabLayout from '@/layouts/tab-layout';
import TabHeader from '@/components/tab-header';
export default {
  components: {
    SideMenu,
    GlobalHeader,
    TabLayout,
    TabHeader
  },
  data() {
    return {
      collapsed: false,
      menus: [],
      activeKey: '',
      pageList: []
    };
  },
  created() {
    this.getPermissions();
  },
  methods: {
    toggleCollapsedMenu(value) {
      this.collapsed = value;
    },
    selectMenu(obj) {
      const { menus, findMenuByKey, pageList } = this;
      const menu = findMenuByKey(menus, obj.key);
      if (!pageList.includes(menu)) {
        pageList.push(menu);
      }
      this.activeKey = obj.key;
    },
    findMenuByKey(menus, key) {
      for (let item of menus) {
        if (item.path === key) {
          return item;
        } else if (item.children && item.children.length > 0) {
          return this.findMenuByKey(item.children, key);
        }
      }
    },
    onChangeTab(activeKey) {
      this.activeKey = activeKey;
    },
    async getPermissions() {
      const result = await this.$store.dispatch('loginUser/getPermissions');
      this.menus = result.data.menus;
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  .header {
    padding: 0 12px 0 0;
    background-color: @primary-color;
    height: @global-header-height;
    line-height: @global-header-line-height;
    color: #fff;
  }
}
</style>
