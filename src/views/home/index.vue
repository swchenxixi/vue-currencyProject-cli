<template>
  <a-layout>
    home
  </a-layout>
</template>

<script>
import BasicWebsocket from '@/api/basicWebsocket.js';

export default {
  data() {
    return {
      collapsed: false,
      menus: [],
      activeKey: '',
      pageList: [],
      websocket: null
    };
  },
  created() {
    this.init();
    this.websocket = new BasicWebsocket(
      process.env.VUE_APP_WEBSOCKET_URL,
      this.handleWebsokcet
    );
  },
  destroyed() {
    if (this.websocket && this.websocket.websocket) {
      this.websocket.connectable = false;
      this.websocket.websocket.close();
    }
  },
  methods: {
    /** 处理websocket推送消息 */
    handleWebsokcet(data) {
      console.log(data);
    },
    async init() {
      await this.getPermissions();
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
