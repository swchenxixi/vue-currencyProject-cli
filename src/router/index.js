import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './config';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要登录才能访问
    if (store.state.loginUser.isLoading) {
      //正在登录中
      next({ name: 'Auth', query: { returnUrl: to.fullPath } });
    } else if (store.state.loginUser.data) {
      //已登录
      next();
    } else {
      //未登录
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
