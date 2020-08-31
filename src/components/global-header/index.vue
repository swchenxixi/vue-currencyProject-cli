<template>
  <a-row type="flex" justify="space-between">
    <a-col :span="8">
      <a-icon
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        class="trigger"
        @click="toggleCollapsed"
      />
      <span>欢迎进入 Jeecg-Boot 企业级快速开发平台</span>
    </a-col>
    <a-col :span="12"><user-menu /></a-col>
  </a-row>
</template>

<script>
import UserMenu from '@/components/user-menu';
export default {
  components: {
    UserMenu
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.$emit('toggleCollapsed', this.collapsed);
    }
  }
};
</script>

<style lang="less" scoped>
.trigger {
  padding: 0 10px;
  font-size: 22px;
}
</style>
