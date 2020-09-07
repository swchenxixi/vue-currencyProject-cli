<template>
  <div class="formPage">
    <div class="forms">
      <slot name="formBox" />
    </div>
    <div class="btnbox">
      <a-button type="primary" @click="onSubmitForm">
        保存
      </a-button>
      <a-button style="margin-left: 10px;" @click="onCancelForm">
        取消
      </a-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    onSubmit: Function,
    onCancel: Function
  },
  methods: {
    onSubmitForm() {
      this.onSubmit();
    },
    onCancelForm() {
      this.onCancel();
    }
  }
};
</script>
<style lang="less" scoped>
.btnbox {
  padding-left: 16.66666667%;
}
</style>
