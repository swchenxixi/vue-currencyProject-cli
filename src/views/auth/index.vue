<template>
  <fixed-center>
    权限验证中...
  </fixed-center>
</template>

<script>
import FixedCenter from '@/components/fixed-center';
import { mapState } from 'vuex';
export default {
  components: {
    FixedCenter
  },
  computed: {
    ...mapState('loginUser', ['data', 'isLoading'])
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.handleLogin();
      }
    }
  },
  methods: {
    handleLogin() {
      const returnUrl = this.$route.query.returnUrl;
      if (this.data) {
        //已登录
        if (returnUrl) {
          this.$router.push(returnUrl);
        } else {
          this.$router.push({ name: 'Home' });
        }
      } else {
        //未登录
        this.$router.push({ name: 'Login', query: { returnUrl } });
      }
    }
  }
};
</script>

<style></style>
