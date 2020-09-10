import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './config';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
    return;
  }
  let token = localStorage.getItem('token');
  if (token === null || token === '') {
    next('/login');
    return;
  }
  next();
});

export default router;
