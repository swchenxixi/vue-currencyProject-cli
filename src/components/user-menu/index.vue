<template>
  <div class="user-menu">
    <span class="action" @click="showClick">
      <a-icon type="search"></a-icon>
    </span>
    <component
      :is="searchMenuComp"
      v-show="searchMenuVisible"
      class="borders"
      :visible="searchMenuVisible"
      title="搜索菜单"
      :footer="null"
      @cancel="searchMenuVisible = false"
    >
      <a-select
        class="search-input"
        showSearch
        :showArrow="false"
        placeholder="搜索菜单"
        optionFilterProp="children"
        :filterOption="filterOption"
        :getPopupContainer="node => node.parentNode"
        @change="search"
        @blur="hiddenClick"
      >
        <a-select-option
          v-for="(site, index) in searchMenuOptions"
          :key="index"
          :value="site.id"
          >{{ site.title }}</a-select-option
        >
      </a-select>
    </component>
    <span class="action">
      <a-icon type="question-circle" />
    </span>
    <span class="action">
      <a-icon type="bell" />
    </span>
    <a-dropdown>
      <span class="action action-full ant-dropdown-link user-dropdown-menu">
        <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">
          U
        </a-avatar>
        <span>&nbsp;欢迎您，admin</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <router-link :to="{ name: 'account-center' }">
            <a-icon type="user" />
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'account-settings-base' }">
            <a-icon type="setting" />
            <span>账户设置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="tool" />
          <span>系统设置</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="setting" />
          <span>密码修改</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="cluster" />
          <span>切换部门</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <span class="action">
      <a-icon type="logout" />
      <span>&nbsp;退出登录</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchMenuVisible: false,
      searchMenuOptions: [
        { id: 1, title: 'Option 1' },
        { id: 2, title: 'Option 2' }
      ],
      searchMenuComp: 'span'
    };
  },
  methods: {
    showClick() {
      this.searchMenuVisible = true;
    },
    hiddenClick() {
      this.shows = false;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    search(value) {
      console.log(value);
      this.searchMenuVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.user-menu {
  text-align: right;
  .search-input {
    width: 180px;
    color: inherit;
    /deep/ .ant-select-selection {
      background-color: inherit;
      border: 0;
      border-bottom: 1px solid white;
      &__placeholder,
      &__field__placeholder {
        color: inherit;
      }
    }
  }

  /deep/ .ant-select-dropdown {
    text-align: left;
  }

  .action {
    display: inline-block;
    padding: 0 14px;
    height: 70%;
    line-height: 46px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
