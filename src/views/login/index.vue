<template>
  <fixed-center>
    <login-form :width="320" :onLogin="handleLogin" />
  </fixed-center>
</template>

<script>
import FixedCenter from '@/components/fixed-center';
import LoginForm from './components/login-form';
export default {
  components: {
    FixedCenter,
    LoginForm
  },

  methods: {
    async handleLogin(form) {
      const result = await this.$store.dispatch('loginUser/login', form);
      if (result) {
        const returnUrl = this.$route.query.returnUrl;
        if (returnUrl) {
          this.$router.push(returnUrl);
        } else {
          this.$router.push({ name: 'Home' });
        }
      } else {
        this.$message.error('账号或密码错误!');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 320px;
}
</style>
