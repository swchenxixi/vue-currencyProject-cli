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
            @delete="onDeleteTab"
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
import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4();
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
    this.init();
  },
  methods: {
    async init() {
      await this.getPermissions();
      this.initTabHeader();
    },
    initTabHeader() {
      const { menus } = this;
      if (menus && menus.length > 0) {
        this.activeKey = menus[0].path;
        this.pageList.push(menus[0]);
      }
    },
    async getPermissions() {
      const result = await this.$store.dispatch('loginUser/getPermissions');
      this.menus = result.data.menus;
    },
    toggleCollapsedMenu(value) {
      this.collapsed = value;
    },
    selectMenu(obj) {
      const { menus, findMenuByKey, pageList } = this;
      const menu = findMenuByKey(menus, obj.key);
      if (menu && !pageList.includes(menu)) {
        pageList.push(menu);
      }
      this.activeKey = obj.key;
    },
    findMenuByKey(menus, key) {
      for (let item of menus) {
        if (item.path === key) {
          return item;
        }
        if (item.children && item.children.length > 0) {
          const target = this.findMenuByKey(item.children, key);
          if (target) return target;
        }
      }
    },
    onChangeTab(activeKey) {
      this.activeKey = activeKey;
    },
    onDeleteTab(targetKey) {
      const { pageList, activeKey } = this;
      const targetIndex = pageList.findIndex(item => {
        return item.path === targetKey;
      });
      //如果关闭的是首页
      if (targetIndex === 0) {
        this.$message.warning({ content: '首页不能关闭', key: uuid });
        return;
      }
      //如果关闭的是当前激活的页面
      if (activeKey === targetKey) {
        this.activeKey = pageList[targetIndex - 1].path;
      }
      pageList.splice(targetIndex, 1);
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
