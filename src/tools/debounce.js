// 点击事件防抖处理
import Vue from 'vue';
const debounceFun = Vue.directive('debounceFun', {
  inserted: function(el, binding) {
    console.log('bingding=', binding);
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 3000);
      }
    });
  }
});

export { debounceFun };
