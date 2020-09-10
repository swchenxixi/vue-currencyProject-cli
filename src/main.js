import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//加载常用ant-design-vue组件
import './loading-antd';
import { message, notification } from 'ant-design-vue';

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;

Vue.config.productionTip = false;
process.env.VUE_APP_MOCK === 'true' && require('@/mock');

store.dispatch('loginUser/whoAmI');

import { debounceFun } from '@/tools/debounce.js'; //防多次点击，重复提交
Vue.prototype.debounceFun = debounceFun;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
